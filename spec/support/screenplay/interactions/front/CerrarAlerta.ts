import {Actor, Interaction} from '@serenity-js/core';
import {browser, ExpectedConditions} from 'protractor';
import {Ensure, equals} from '@serenity-js/assertions';
import {TextoAlerta} from '../../questions';

export const CerrarAlerta = {
    delNavegador: (textoAlerta: string) =>
        Interaction.where(`#actor cierra la alerta del navegador`, (actor: Actor) =>
            browser.wait(ExpectedConditions.alertIsPresent(), 5000).then(() => {
                actor.attemptsTo(
                    Ensure.that(TextoAlerta.esVisible(), equals(textoAlerta))
                );
                browser.switchTo().alert().accept();
            })
        )
};
