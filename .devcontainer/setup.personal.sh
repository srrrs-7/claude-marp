#!/bin/bash
set -e

# Install tmux and jq
echo "Installing tmux and jq..."
sudo apt-get update
sudo apt-get install -y tmux jq

# Git configuration
git config --global user.email "sato.ryosuke@classmethod.jp"
git config --global user.name "Sato Ryosuke"

echo "Personal setup completed!"
