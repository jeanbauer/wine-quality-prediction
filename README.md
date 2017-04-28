# wine-quality-prediction

# Instalação

Usando node(nodejs.org) versão >= 7.29.0

`npm install -g`

Se houver erro, tente com permissão de adm:

`sudo npm install -g`

# Execução
```
redeMLP <fase> <arquivo>
```

Onde: 
- fase: "treinamento" ou "generalizacao"
- arquivo: Nome do arquivo a ser analisado

Ex:
```
redeMLP treinamento winequality.csv
```