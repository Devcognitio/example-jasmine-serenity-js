import {CarritoCompraPage, Comprar, Seleccionar} from '../support/screenplay';
import {actorCalled} from '@serenity-js/core';
import {browser, protractor} from 'protractor';
import {Ensure, equals} from '@serenity-js/assertions';
import {TextoElemento} from '../support/screenplay/questions';
import {BrowseTheWeb} from '@serenity-js/protractor';


describe('Comprar celular en DemoBlaze', () => {

    const escenarios = [
        {rangoPrecio: 'costoso'},
        {rangoPrecio: 'economico'},
    ];

    const datos =
        {Nombre: 'Juan Camilo Murcia Ramos', Pais: 'Colombia', Ciudad: 'Medellin', TargetaCredito: '1234098734568976', Mes: 'Mayo', Ano: '2020'};

    const actor = actorCalled('jasmine').whoCan(BrowseTheWeb.using(protractor.browser));

    beforeEach(() => {
        browser.get(browser.baseUrl);
    });

    escenarios.forEach(escenario =>
        it('Observar mensaje de compra, al comprar el celular mas ' + escenario.rangoPrecio, () =>
            actor.attemptsTo(
                Seleccionar.elProducto(escenario.rangoPrecio),
                Comprar.producto(datos),
                Ensure.that(TextoElemento(CarritoCompraPage.lblMensajeCompraRealizada),
                    equals('Thank you for your purchase!')),
            ))
    );
});
