import {Actor, Interaction, Note} from '@serenity-js/core';
import {TokenService} from '../../questions/services';
import {LastResponse, PostRequest, Send} from '@serenity-js/rest';

export const RequestProductos = {
    carrito: () =>
        Interaction.where(`#actor obtiene los productos en el carrito de compras`, (actor: Actor) => {
            return Note.of(TokenService(LastResponse.body())).answeredBy(actor).then(value => {
                return actor.attemptsTo(
                    Send.a(PostRequest.to('/viewcart').with({cookie: value, flag: false}))
                );
            });
        })
};
