import {TakeNote, Task} from '@serenity-js/core';
import {LastResponse, PostRequest, Send} from '@serenity-js/rest';
import {TokenService} from '../../questions/services';

export const IniciarSesion = {
    enApi: (credenciales: { password: string; username: string }) =>
        Task.where(`#actor inicia sesion para generar el token`,
            Send.a(PostRequest.to('/login').with(credenciales)),
            TakeNote.of(TokenService(LastResponse.body())),
        )
};
