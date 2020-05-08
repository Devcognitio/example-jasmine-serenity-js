import {Click, Enter, isClickable, isVisible, Wait} from '@serenity-js/protractor';
import {CarritoCompraPage} from '../../ui';
import {Task} from '@serenity-js/core';
import {Check} from '@serenity-js/assertions';
import {CerrarAlerta} from '../../interactions';


export const Comprar = {
    producto: (dataTableDatosPersonales: { Nombre: string; Ano: string; TargetaCredito: string; Mes: string; Ciudad: string; Pais: string }) =>
        Task.where(`#actor realiza la compra del producto`,
            CerrarAlerta.delNavegador('Product added'),
            Check.whether(CarritoCompraPage.btnCarritoCompras, isClickable())
                .andIfSo(Click.on(CarritoCompraPage.btnCarritoCompras)),
            Wait.until(CarritoCompraPage.cntProductoCarrito, isVisible()),
            Check.whether(CarritoCompraPage.btnRealizarPedido, isClickable())
                .andIfSo(Click.on(CarritoCompraPage.btnRealizarPedido)),
            Wait.until(CarritoCompraPage.txtNombre, isClickable()),
            Check.whether(CarritoCompraPage.txtNombre, isClickable())
                .andIfSo(Enter.theValue(dataTableDatosPersonales.Nombre).into(CarritoCompraPage.txtNombre)),
            Enter.theValue(dataTableDatosPersonales.Pais).into(CarritoCompraPage.txtPais),
            Enter.theValue(dataTableDatosPersonales.Ciudad).into(CarritoCompraPage.txtCiudad),
            Enter.theValue(dataTableDatosPersonales.TargetaCredito).into(CarritoCompraPage.txtTarjetaCredito),
            Enter.theValue(dataTableDatosPersonales.Mes).into(CarritoCompraPage.txtMes),
            Enter.theValue(dataTableDatosPersonales.Ano).into(CarritoCompraPage.txtAno),
            Click.on(CarritoCompraPage.btnComprar)
        )
};

