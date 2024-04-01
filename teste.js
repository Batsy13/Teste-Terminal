const read = require('readline-sync');
const express = require('express');
const axios = require('axios');

const url = 'http://teste-olimpiadas-iesb.sa-east-1.elasticbeanstalk.com/'


async function main(){

    let n;

    var token = await login();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if(token){
        do {

            console.log("--------Atletas-------")
            console.log("1 - Ver Dados Atletas ")
            console.log("2 - Adicionar Atleta ")
            console.log("3 - Atualizar Atleta ")
            console.log("4 - Deletar Atleta")
            console.log("--------Paises--------")
            console.log("5 - Ver Dados Paises")
            console.log("6 - Adicionar Pais")
            console.log("7 - Atualizar Pais")
            console.log("8 - Deletar Pais")
            console.log("-------Esportes-------")
            console.log("9 - Ver Dados Esportes")
            console.log("10 - Adicionar Esporte")
            console.log("11 - Atualizar Esporte")
            console.log("12 - Deletar Esporte")
            console.log("13 - Sair do programa")
            n = Number(read.question(""));
        
            switch (n) {
                case 1:
                    await getAtleta();
                    break;
                case 2:
                    await adicionarAtleta();
                    break;
                case 3:
                    atualizarAtleta();
                    break;
                case 4:
                    await deletarAtleta();
                    break;
                case 5:
                    await getPais();
                    break;
                case 6:
                    await adicionarPais();
                    break;
                case 7:
                    await atualizarPais();
                    break;
                case 8:
                    await deletarPais();
                    break;
                case 9:
                    await getEsporte();
                    break;
                case 10: 
                    await adicionarEsporte();
                    break;
                case 11:
                    await atualizarEsporte();
                    break;
                case 12:
                    await deletarEsporte();
                    break;
                case 13:
                    console.log("Saindo do programa...");
                    break;
                default:
                    console.log("Digite um valor válido");
                    break;
                
            }
        
        } while (n != 13);
    }
    else{
        console.log("Login inválido");
    }

}

main();

// Funções

async function login(){
    console.log("Bem vindo(a), por favor insira seus dados:");
    var usuario = read.question("Digite seu usuario:");
    var senha = read.question("Digite sua senha:");
    const login = new URLSearchParams({
        username: `${usuario}`,
        password: `${senha}`
    });
    
    try {
        let response = await axios.post(`${url}login/token`, login, {Headers: {'content-type': 'x-www-form-urlencoded',}});
        console.log(response.data);
        return response.data.token; // Retorna o token se o login for bem-sucedido
    } catch (error) {
        return null; // Retorna nulo se houver um erro no login
    }
} 

// Atleta

async function getAtleta(){
    await axios.get(`${url}atletas`)
    .then((res) => {console.log(res.data)})
    .catch((e) => {console.log(e)});
}


async function adicionarAtleta(){

    var nomeAtleta = read.question("Nome: ");
    var idadeAtleta = read.question("Idade: ");
    var id_pais = read.question("id_pais: ");
    var id_esporte = read.question("id_esporte: ");

    const atleta = {
        nome: `${nomeAtleta}`,
        idade: Number(`${idadeAtleta}`),
    };

    let json = JSON.stringify(atleta);

    try{
        await axios.post(`${url}atletas/${id_pais}/${id_esporte}`, json)
        console.log("Atleta Adicionado");
    } catch (error) {
        console.log(error);
    }
};

// 660aad5ad322abb4f0fbeabc - id boxe
// 660ab16fd322abb4f0fbeabd - id brasil

async function atualizarAtleta(){

    var id = read.question("Id_atleta:")
    var nomeAtleta = read.question("Nome:");
    var idadeAtleta = read.question("Idade:");
    var id_esporte = read.question("Id_esporte:");
    var id_pais = read.question("Id_pais:");

    const atleta = {
        pais_id: `${id_pais}`,
        esporte_id: `${id_esporte}`,
        nome: `${nomeAtleta}`,
        idade: `${idadeAtleta}`
    };

    var json = JSON.stringify(atleta)

    await axios.patch(`${url}atletas?_id=${id}`, json)
    .then((res) => {console.log("Sucesso na atualização", res.data)})
    .catch((error) => {
        console.log("Não foi possível atualizar o atleta", error);
    })
}

async function deletarAtleta(){

    var id = read.question("Id para deletar: ");

    await axios.delete(`${url}atletas?_id=${id}`)
    .then((res) => {
        console.log("Atleta deletado com sucesso")
    })
    .catch((error) => {
        console.log("Não foi possível achar um atleta com este ID");
    })
}

// País

async function getPais(){
    await axios.get(`${url}paises`)
    .then((res) => {console.log(res.data)})
    .catch((e) => {console.log(e);});
}

async function adicionarPais(){
    
    var nomePais = read.question("Nome: ");
    var sigla = read.question("Sigla: ");
    var continente = read.question("continente: ");

    const pais = {
        nome: `${nomePais}`,
        sigla: `${sigla}`,
        continente: `${continente}`
    };

    JSON.stringify(pais);

    try{
        await axios.post(`${url}paises`, pais)
        console.log("Pais adicionado");
    } catch (error) {
        console.log(error);
    }

}

async function atualizarPais(){

    var idPais = read.question("id:")
    var nomePais = read.question("Nome:");
    var sigla = read.question("Sigla:");
    var continente = read.question("continente:");

    const pais = {
        nome: `${nomePais}`,
        sigla: `${sigla}`,
        continente: `${continente}`
    };

    var json = JSON.stringify(pais);

    await axios.patch(`${url}paises?_id=${idPais}`, json )
    .then((res) => {console.log("Sucesso na atualização")})
    .catch((error) => {
        console.log("Não foi possível atualizar o pais");
        console.log(error);
    })

}

async function deletarPais(){

    var id = read.question("Id para deletar: ")

    await axios.delete(`${url}paises?_id=${id}`)
    .then((res) => {
        console.log("Pais deletado com sucesso")
    })
    .catch((error) => {
        console.log("Não foi possível deletar o país");
        console.log(error.data);
    })

}

// Esporte

async function getEsporte(){
    await axios.get(`${url}esportes`)
    .then((res) => {console.log(res.data)})
    .catch((e) => {console.log(e)});
}

async function adicionarEsporte(){
    
    var nomeEsporte = read.question("Nome: ");
    var coletivo = read.question("Coletivo: [sim]/[nao] ", {trueValue: ['sim','s'], falseValue: ['nao','n','não'], caseSensitive: false});

    const esporte = {
        nome: `${nomeEsporte}`,
        coletivo: Boolean(`${coletivo}`),
    };

    try{
        await axios.post(`${url}esportes`, JSON.stringify(esporte))
        console.log("Esporte adicionado");
    } catch (error) {
        console.log(error.data);
    }

}

async function atualizarEsporte(){

    var idEsporte = read.question("id:")
    var nomeEsporte = read.question("Nome:");

    const esporte = {
        nome: `${nomeEsporte}`,
    };

    var json = JSON.stringify(esporte);

    await axios.put(`${url}esportes?_id=${idEsporte}`, json )
    .then((res) => {console.log("Sucesso na atualização")})
    .catch((error) => {
        console.log("Não foi possível atualizar o esporte");
        console.log(error.data);
    })

}

async function deletarEsporte(){

    var id = read.question("Id para deletar: ")

    await axios.delete(`${url}esportes?_id=${id}`)
    .then((res) => {
        console.log("Esporte deletado com sucesso")
    })
    .catch((error) => {
        console.log("Não foi possível deletar o esporte")
        console.log(error.data);
    })

}