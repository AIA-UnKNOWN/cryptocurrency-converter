import './style.scss';

(function() {

let cryptocurrencies = [];

const fromValueField = document.querySelector( '#from-value' );
const toValueField = document.querySelector( '#to-value' );
const fromFieldCryptocurrency = document.querySelector( '.field.from .cryptocurrency' );
const toFieldCryptocurrency = document.querySelector( '.field.to .cryptocurrency' );
const fromCurrencies = document.querySelector( '.field.from .currencies' );
const toCurrencies = document.querySelector( '.field.to .currencies' );
const convertButton = document.querySelector( '.convert-button' );

const api = {
	key: 'ae76cc66-a8e0-4a80-941f-4e62a8ad8f74'
};

async function request( method, url ) {
	return await fetch( url, {
		method: method,
		headers: {
			'Accept': 'application/json',
			'X-CMC_PRO_API_KEY': api.key
		}
	});
}

function setCryptocurrency( element, cryptocurrency ) {
	element.setAttribute( 'id', cryptocurrency.id );
	element.innerText = cryptocurrency.symbol;
}

request( 'GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' )
	.then( response => {
		return response.json();
	})
	.then( response => {
		cryptocurrencies = response.data;

		cryptocurrencies.forEach( cryptocurrency => {
			// This is 'From' field
			const fromFieldLi = document.createElement( 'li' );
			const fromFieldLabel = document.createElement( 'label' );
			fromFieldLabel.setAttribute( 'for', 'other-currency-selection-toggler-for-from' );
			fromFieldLabel.innerText = cryptocurrency.symbol;
			fromFieldLabel.onclick = function() {
				return setCryptocurrency(
					fromFieldCryptocurrency,
					cryptocurrency
				);
			}
			fromFieldLi.appendChild( fromFieldLabel );
			fromCurrencies.appendChild( fromFieldLi );

			// This is 'To' field
			const toFieldLi = document.createElement( 'li' );
			const toFieldLabel = document.createElement( 'label' );
			toFieldLabel.setAttribute( 'for', 'other-currency-selection-toggler-for-to' );
			toFieldLabel.innerText = cryptocurrency.symbol;
			toFieldLabel.onclick = function() {
				return setCryptocurrency(
					toFieldCryptocurrency,
					cryptocurrency
				);
			}
			toFieldLi.appendChild( toFieldLabel );
			toCurrencies.appendChild( toFieldLi );
		});
	})
	.catch( error => {
		console.log( 'Request error: ' + error );
	});

convertButton.addEventListener( 'click', function() {
	const fromFieldCryptocurrencyID = parseInt( fromFieldCryptocurrency.id );
	const toFieldCryptocurrencyID = parseInt( toFieldCryptocurrency.id );

	let fromPrice = 0;
	let toPrice = 0;
	
	cryptocurrencies.forEach( crypto => {
		if ( crypto.id === fromFieldCryptocurrencyID ) {
			fromPrice = ( crypto.quote.USD.price * fromValueField.value);

				cryptocurrencies.forEach( toCrypto => {
					if ( toCrypto.id === toFieldCryptocurrencyID ) {
							toPrice = toCrypto.quote.USD.price;
						return;
					}
				});

			return;
		}
	});

	toValueField.value = convertCurrency( fromPrice, toPrice );
});

function convertCurrency( fromCurrency, toCurrency ) {
	const convertedResult = ( fromCurrency / toCurrency );
	return convertedResult.toFixed(5);
}

})();