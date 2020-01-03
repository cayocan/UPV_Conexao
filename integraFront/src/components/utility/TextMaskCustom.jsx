import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export default function TextMaskCustom(props) {
    const { inputRef, id, ...other } = props;
    const masks = {
        tel:['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cep:[/[0-9]/, /\d/, /\d/, /\d/, /\d/,'-',/\d/, /\d/,/\d/],
        cnpj:[/[0-9]/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/],
        cpf:[/[0-9]/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-',/\d/, /\d/],
        rg:[/[0-9]/, /\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'-',/\d/],
        numero:[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/],
        cns:[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        int2:[/[0-9]/, /\d/],
    };

    const moneyMask = createNumberMask({
        prefix: 'R$ ',
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        integerLimit:10,
        // requireDecimal: true,
    });

    function checkMask(){
        let retorno;
        Object.entries(masks).forEach(([key, value]) => {
            if (key===id) {
                retorno=value;
            }
        });
        if (retorno===undefined) {
            retorno=masks.numero
        }
        return retorno;
    }

    return (
        <>
            {/* {console.log(masks[id])} */}
            <MaskedInput
                {...other}
                // defaultValue={''}
                mask={id==='money'?moneyMask:checkMask}
                guide={false}
                showMask={false}
            />
      </>
    );
}