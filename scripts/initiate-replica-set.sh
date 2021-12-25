#!/bin/bash

ls -la

mongo --host mongodb <<EOF
var cfg = {
    _id : 'rs0',
    protocolVersion: 1,
    members: [
      { _id : 0, host : "localhost:27017", priority: 1 }
    ]
  }
rs.initiate(cfg, { force: true })
rs.reconfig(cfg, { force: true })
db.getMongo().setReadPref('nearest');
EOF
