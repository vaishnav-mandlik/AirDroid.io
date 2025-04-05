#!/bin/sh

set -e

cnf_dir='/mnt/openssl/'
certs_dir='/etc/ssl/certs/'

# Set default FQDN if not provided
: "${FQDN:=sharedrop.it}"
echo "Generating SSL certs for FQDN: $FQDN"

# Generate CA
openssl req \
  -config "${cnf_dir}snapdropCA.cnf" \
  -new -x509 -days 1 \
  -keyout "${certs_dir}snapdropCA.key" \
  -out "${certs_dir}snapdropCA.crt" \
  -nodes

# Generate CSR + key for server
openssl req \
  -config "${cnf_dir}snapdropCert.cnf" \
  -new -out /tmp/snapdrop-dev.csr \
  -keyout "${certs_dir}snapdrop-dev.key" \
  -nodes

# Sign CSR with CA
openssl x509 -req \
  -in /tmp/snapdrop-dev.csr \
  -CA "${certs_dir}snapdropCA.crt" \
  -CAkey "${certs_dir}snapdropCA.key" \
  -CAcreateserial \
  -extensions req_ext \
  -extfile "${cnf_dir}snapdropCert.cnf" \
  -sha512 -days 1 \
  -out "${certs_dir}snapdrop-dev.crt"

echo "✅ SSL certificates generated."

exec "$@"
