import './style.css';
import { useProductContext } from '../../../../contexts/ProductContext';

const Policy = () => {

    const { product } = useProductContext();

    return (
        <div id="policyContainer">
            <div id="policyTitle">
                <h4>O que você precisa saber</h4>
            </div>
            <div id="policyDescription">
                <div id="houseRules">
                    <h5>Regras da casa</h5>
                    <p>{product.houseRulesPolicy}</p>
                    {/* <p>Check-out: 10:00</p>
                    <p>Não é permitido festa</p>
                    <p>Não fumar</p> */}
                </div>
                <div id="healthSecurity">
                    <h5>Saúde e segurança</h5>
                    <p>{product.healthSecurityPolicy}</p>
                    {/* <p>Diretrizes de distanciamento social e outras regulamentações relacionadas ao coronavírus se aplicam</p>
                    <p>Detector de fumaça</p>
                    <p>Depósito de segurança</p> */}
                </div>
                <div id="cancellation">
                    <h5>Política de cancelamento</h5>
                    <p>{product.cancellationPolicy}</p>
                    {/* <p>Até 7 dias de antecedência à entrada, a devolução do valor pago será integral</p>
                    <p>De 6 dias até a data de ínicio da entrada, haverá a restituição de 75% do valor pago</p> */}
                </div>
            </div>
        </div>
    );
};

export default Policy;