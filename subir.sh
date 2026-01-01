#!/bin/bash
echo "� Subindo alterações para o GitHub..."
git add -A
git commit -m "Update: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Concluído!"
