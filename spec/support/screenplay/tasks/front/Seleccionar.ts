import {Duration, Task} from '@serenity-js/core';
import {Click, isClickable, isVisible, Wait} from '@serenity-js/protractor';
import {DemoblazeHomePage} from '../../ui';
import {Filtrar} from '../../interactions';
import {Check} from '@serenity-js/assertions';

export const Seleccionar = {
    elProducto: (rangoPrecio: string) =>
        Task.where(`#actor escoge el producto mas economico`,
            Click.on(DemoblazeHomePage.btnCelulares),
            Wait.for(Duration.ofMilliseconds(2000)),
            Check.whether(DemoblazeHomePage.cntProductos, isVisible())
                .andIfSo(Filtrar.elProducto(DemoblazeHomePage.tajetasCelulares, rangoPrecio)),
            Wait.until(DemoblazeHomePage.btnAnadirCarrito, isClickable()),
            Click.on(DemoblazeHomePage.btnAnadirCarrito),
        )
};
