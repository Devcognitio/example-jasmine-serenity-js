import {Actor, AnswersQuestions, Interaction, Note, Question, UsesAbilities} from '@serenity-js/core';
import {LastResponse, PostRequest, Send} from '@serenity-js/rest';
import {TokenService} from '../../questions/services';
import {Ensure, equals} from '@serenity-js/assertions';

let response;
let valorMayor = -10000;
let valorMenor = 10000;
let valorProducto;

export const EnviarProducto = {
    alCarrito: () =>
        Interaction.where(`#actor envia el producto al carrito`, (actor: Actor) => {
            return Note.of(TokenService(LastResponse.body())).answeredBy(actor).then(value => {
                return actor.attemptsTo(
                    Send.a(PostRequest.to('/addtocart').with(
                        {
                            id: 'b5a355ab-8a00-4f3f-0f37-06a2a3drtgddf',
                            cookie: value,
                            prod_id: obtenerProducto(LastResponse.body(), 'economico', actor),
                            flag: false
                        })),
                    Ensure.that(LastResponse.status(), equals(200))
                );
            });
        })
};

function obtenerProducto(question: Question<any>, rangoPrecios: string, actor: AnswersQuestions & UsesAbilities) {
    let id;
    response = question.answeredBy(actor).Items;
    obtenerValorComparar(rangoPrecios);
    response.forEach(value => {
        valorProducto = Number(value.price);
        if (rangoPrecios === 'economico') {
            if (valorMenor === valorProducto) {
                id = value.id;
            }
        } else {
            if (valorMayor === valorProducto) {
                id = value.id;
            }
        }
    });
    return id;
}

const obtenerValorComparar = (rangoPrecios: string) => {
    response.forEach(value => {
        valorProducto = Number(value.price);
        switch (rangoPrecios) {
            case 'economico': {
                if (valorProducto < valorMenor) {
                    valorMenor = valorProducto;
                }
                break;
            }
            case 'costoso': {
                if (valorProducto < valorMenor) {
                    valorMayor = valorProducto;
                }
                break;
            }
            default: {
                throw new Error('Valor enviado no es el correcto, por favor valide que sea economico o costoso');
            }
        }
    });
};
