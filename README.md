README

Projeto foi "clonado" para máauina
Confirma se o NOde está instalado

AS dependencias dentro do arquivo  package.jon rodar o comando 
npm install ou yarn install

executar ps testes no modo headless
Salvar os artefatos gerados durante o teste



Comandos do git para criar o repositório remoto no GitHub
echo "# pgats-automacao-web" >> README.md

git init //inicializa o repositório git
git add README.md      //adiciona o arquivo README.md ao stage
git commit -m "first commit" //faz o commit do arquivo adicionado com a mensagem "first commit"
git branch -M main //renomeia a branch principal para "main"
git remote add origin https://github.com/GlauciaRocha/pgats-automacao-web.git  //adiciona o repositório remoto com o nome "origin"
git push  //envia as alterações locais para o repositório remoto na branch "main"

depois esses passos 
git status //verifica o status do repositório
git add . //adiciona todas as alterações feitas
git commit -m "mensagem do commit"       //
git push //envia as alterações locais para o repositório remoto

git pull //puxa as atualizações do repositório remoto para o local



para fazer o arquivo de pipeline direto no vsc criar pasta .github - pasta wokflows/ci.yaml

na aula 8 o exemplo 15minutos de aula de como criar direto no github remoto
