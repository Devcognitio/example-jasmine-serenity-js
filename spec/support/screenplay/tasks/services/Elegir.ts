import {Task} from '@serenity-js/core';
import {PostRequest, Send} from '@serenity-js/rest';
import {EnviarProducto} from '../../interactions';

export const Elegir = {
    productoApi: (tipoProducto: string) =>
        Task.where(`#actor elige el producto a comprar`,
            Send.a(PostRequest.to('/bycat').with({cat: tipoProducto})),
            EnviarProducto.alCarrito(),
        )
};
