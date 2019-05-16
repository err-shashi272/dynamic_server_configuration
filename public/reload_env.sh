#!/usr/bin/env bash

ssh $1@$2 bash << 'EOF'
 source ~/.bashrc
 echo "SUCCESS RELOAD"
EOF