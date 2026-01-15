#!/bin/bash
echo "📤 Subindo alterações para o GitHub (Versão Final)..."
git add -A
git commit -m "Final version: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main --force
echo "✅ Repositório no GitHub atualizado com sucesso!"
