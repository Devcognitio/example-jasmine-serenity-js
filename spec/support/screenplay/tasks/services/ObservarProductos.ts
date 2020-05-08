import {Task, Transform} from '@serenity-js/core';
import {LastResponse, PostRequest, Send} from '@serenity-js/rest';
import {RequestProductos} from '../../interactions/services';
import {Ensure, equals} from '@serenity-js/assertions';

export const ObservarProductos = {
    enElCarrito: () =>
        Task.where(`#actor observa los productos seleccionados en carrito y elimina los producto`,
            RequestProductos.carrito(),
            Ensure.that(LastResponse.status(), equals(200)),
            Ensure.that(Transform.the(LastResponse.body(), body => body.Items.length), equals(1)),
            Send.a(PostRequest.to('/deleteitem').with({id: 'b5a355ab-8a00-4f3f-0f37-06a2a3drtgddf'})),
            Ensure.that(LastResponse.body(), equals('Item deleted.'))
        )
};
