#!/bin/bash
echo "📥 Sincronizando com a versão do GitHub (Hard Reset)..."
git fetch origin main
git reset --hard origin/main
echo "✅ Seus arquivos locais agora são uma cópia exata do GitHub!"
