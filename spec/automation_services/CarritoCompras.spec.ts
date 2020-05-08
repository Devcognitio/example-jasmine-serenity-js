import {actorCalled, TakeNotes} from '@serenity-js/core';
import {Elegir, ObservarProductos} from '../support/screenplay';
import {CallAnApi, LastResponse, PostRequest, Send} from '@serenity-js/rest';
import {Ensure, equals} from '@serenity-js/assertions';
import {IniciarSesion} from '../support/screenplay/tasks/services';

describe('Carrito de compras DemoBlaze Service', () => {

        const credenciales = {username: 'jmurcia', password: 'MjAwMzIwMTU='};
        const actor = actorCalled('jasmine').whoCan(CallAnApi.at('https://api.demoblaze.com'),
            TakeNotes.usingAnEmptyNotepad());

        it('Mostrar mensaje de error al registrar un usuario ya existente', () =>
            actor.attemptsTo(
                Send.a(PostRequest.to('/signup').with(credenciales)),
                Ensure.that(LastResponse.body(), equals({errorMessage: 'This user already exist.'}))
            )
        );

        it('Observar producto seleccionado en el carrito de compras', () =>
            actor.attemptsTo(
                IniciarSesion.enApi(credenciales),
                Elegir.productoApi('phone'),
                ObservarProductos.enElCarrito()
            )
        );
    }
);
