var _defaults = {

	hidden			: { visible: false, fixed: true },
	dummy			: { visible: false, withLabel: false },

	board: {
		clean			: { unitX: 20, unitY: 20, axis: false, keepaspectratio: true, showCopyright: false, showNavigation: false },
		control			: { unitX: 20, unitY: 20, axis: true, keepaspectratio: true, showCopyright: false, showNavigation: true },
		axis			: { unitX: 20, unitY: 20, axis: true, keepaspectratio: true, showCopyright: false, showNavigation: false, axis: { ticks : { majorHeight : 3, label: { highlight: false } } } },
		grid_light		: { unitX: 20, unitY: 20, axis: true, keepaspectratio: true, showCopyright: false, showNavigation: false, grid : { gridX : 1, gridY : 1, strokeColor : '#C0C0C0', strokeOpacity : .2, strokeWidth: 1, dash : 0 }, axis: { ticks : { label: { highlight: false } } } },
		grid			: { unitX: 20, unitY: 20, axis: true, keepaspectratio: true, showCopyright: false, showNavigation: false, grid : { gridX : 1, gridY : 1, strokeColor : '#333', strokeOpacity : .12, strokeWidth: 1, dash : 0 }, axis: { ticks : { strokeColor: '#333', strokeOpacity : .26, label: { highlight: false } } } }
	},

	point: {
		interact	: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: false },
		static 		: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: false, fixed: true, highlight: false, face: 'x' },
		fake 		: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: false, highlight: false, face: 'x' },
		info		: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: true },
		grid		: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: false, snapToGrid : true, snapSizeX : 1, snapSizeY : 1 },
		grid_info	: { size: 4, fillColor: '#CCCCCC', strokeColor: '#999999', withLabel: false, showInfoBox: true, snapToGrid : true, snapSizeX : 1, snapSizeY : 1 },
		correct		: { size: 4, fillColor: '#398439', strokeOpacity: 0, withLabel: false, showInfoBox: false, fixed: true, highlight: false },
		correct_x	: { size: 4, fillColor: '#398439', strokeColor: '#398439', withLabel: false, showInfoBox: false, fixed: true, highlight: false, face: 'x' },
		wrong		: { size: 4, fillColor: '#d9534f', strokeColor: '#ac2925', withLabel: false, showInfoBox: false, fixed: true, highlight: false, face: 'x' },
		label 		: { size: 0, withLabel: true, },
		color: {
			main		: { size: 4, fillColor: '#10ABBF', strokeColor: '#006099', withLabel: false, showInfoBox: false, highlight: false },
			aux			: { size: 4, fillColor: '#58A60A', strokeColor: '#153F00', withLabel: false, showInfoBox: false, highlight: false },
			highlight	: { size: 4, fillColor: '#D64640', strokeColor: '#660000', withLabel: false, showInfoBox: false, highlight: false },
			static: {
				main 		: { size: 4, fillColor: '#10ABBF', strokeOpacity: 0, withLabel: false, showInfoBox: false, fixed: true, highlight: false },
				aux 		: { size: 4, fillColor: '#58A60A', strokeOpacity: 0, withLabel: false, showInfoBox: false, fixed: true, highlight: false },
				highlight 	: { size: 4, fillColor: '#D64640', strokeOpacity: 0, withLabel: false, showInfoBox: false, fixed: true, highlight: false }
			},
			grid: {
				main		: { size: 4, fillColor: '#10ABBF', strokeColor: '#006099', withLabel: false, highlight: false, showInfoBox: false, snapToGrid : true, snapSizeX : 1, snapSizeY : 1 },
				aux			: { size: 4, fillColor: '#58A60A', strokeColor: '#153F00', withLabel: false, highlight: false, showInfoBox: false, snapToGrid : true, snapSizeX : 1, snapSizeY : 1 },
				highlight	: { size: 4, fillColor: '#D64640', strokeColor: '#660000', withLabel: false, highlight: false, showInfoBox: false, snapToGrid : true, snapSizeX : 1, snapSizeY : 1 }
			}
		}
	},

	polygon: {
		interact	: { borders: { strokeWidth: 2, strokeColor: '#999' }, fillColor: '#FFF' },
		static 		: { borders: { strokeWidth: 2, strokeColor: '#999', highlight: false }, fillColor: '#FFF', fixed: true, highlight: false },
		large: {
			main		: { borders: { strokeWidth: 2, strokeColor: '#10ABBF', highlight: false }, fillColor: '#FFF', fixed: true, highlight: false },
			aux			: { borders: { strokeWidth: 2, strokeColor: '#58A60A', highlight: false }, fillColor: '#FFF', fixed: true, highlight: false },
			highlight	: { borders: { strokeWidth: 2, strokeColor: '#D64640', highlight: false }, fillColor: '#FFF', fixed: true, highlight: false },
			draft		: { borders: { strokeWidth: 2, strokeColor: '#CCC', highlight: false, dash: 2 }, fillColor: '#FFF', fixed: true, highlight: false }
		},
		fill: {
			highlight	: { borders: { strokeWidth: 1, strokeColor: '#333', highlight: false }, fillColor: '#D64640', fillOpacity: .4, fixed: true, highlight: false },
			draft		: { borders: { strokeWidth: 2, strokeColor: '#CCC', highlight: false, dash: 2 }, fillColor: '#CCC', fillOpacity: .6, fixed: true, highlight: false }
		},
		unborder: {
			main		: { borders: { strokeWidth: 0 }, fillColor: '#10ABBF', fillOpacity: .7, fixed: true, highlight: false },
			aux			: { borders: { strokeWidth: 0 }, fillColor: '#58A60A', fillOpacity: .7, fixed: true, highlight: false },
			highlight	: { borders: { strokeWidth: 0 }, fillColor: '#D64640', fillOpacity: .7, fixed: true, highlight: false },
			draft		: { borders: { strokeWidth: 0 }, fillColor: '#CCC', fillOpacity: .6, fixed: true, highlight: false },
			rand: [
				{ borders: { strokeWidth: 0 }, fillColor: '#3EBF00', fillOpacity: .7, fixed: true, highlight: false },
				{ borders: { strokeWidth: 0 }, fillColor: '#FFC800', fillOpacity: .7, fixed: true, highlight: false },
				{ borders: { strokeWidth: 0 }, fillColor: '#E60000', fillOpacity: .7, fixed: true, highlight: false },
				{ borders: { strokeWidth: 0 }, fillColor: '#99008F', fillOpacity: .7, fixed: true, highlight: false },
				{ borders: { strokeWidth: 0 }, fillColor: '#006099', fillOpacity: .7, fixed: true, highlight: false }
			],
			mix: {
				'1_2': { borders: { strokeWidth: 0 }, fillColor: '#9fc400', fillOpacity: .6, fixed: true, highlight: false },
				'1_3': { borders: { strokeWidth: 0 }, fillColor: '#925f00', fillOpacity: .6, fixed: true, highlight: false },
				'1_4': { borders: { strokeWidth: 0 }, fillColor: '#6c5f48', fillOpacity: .6, fixed: true, highlight: false },
				'1_5': { borders: { strokeWidth: 0 }, fillColor: '#1f8f4d', fillOpacity: .6, fixed: true, highlight: false },
				'2_1': { borders: { strokeWidth: 0 }, fillColor: '#d8d33d', fillOpacity: .6, fixed: true, highlight: false },
				'2_3': { borders: { strokeWidth: 0 }, fillColor: '#f26400', fillOpacity: .6, fixed: true, highlight: false },
				'2_4': { borders: { strokeWidth: 0 }, fillColor: '#cc6448', fillOpacity: .6, fixed: true, highlight: false },
				'2_5': { borders: { strokeWidth: 0 }, fillColor: '#7f944d', fillOpacity: .6, fixed: true, highlight: false },
				'3_4': { borders: { strokeWidth: 0 }, fillColor: '#bf0048', fillOpacity: .6, fixed: true, highlight: false },
				'3_5': { borders: { strokeWidth: 0 }, fillColor: '#73304d', fillOpacity: .6, fixed: true, highlight: false },
				'4_5': { borders: { strokeWidth: 0 }, fillColor: '#4c3094', fillOpacity: .6, fixed: true, highlight: false }
			}
		},
		regular 		: { borders: { strokeWidth: 1, strokeColor: '#999', highlight: false }, fillColor: '#FFF', fixed: true, highlight: false, vertices: { withLabel: false, showInfoBox: false, visible: false } }
	},

	line: {
		interact: {
			main		: { strokeColor: '#10ABBF', strokeWidth: 2, layer: 0 },
			aux			: { strokeColor: '#58A60A', strokeWidth: 2, layer: 0 },
			highlight	: { strokeColor: '#D64640', strokeWidth: 2, layer: 0 }
		},
		large: {
			main		: { strokeColor: '#10ABBF', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
			aux			: { strokeColor: '#58A60A', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
			highlight	: { strokeColor: '#D64640', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
			draft		: { strokeColor: '#CCC', strokeWidth: 2, dash: 2, layer: 0, highlight: false, fixed: true },
			correct		: { strokeColor: '#398439', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
			wrong		: { strokeColor: '#ac2925', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
			rand: [
				{ strokeColor: '#3EBF00', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
				{ strokeColor: '#FFC800', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
				{ strokeColor: '#E60000', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
				{ strokeColor: '#99008F', strokeWidth: 2, layer: 0, highlight: false, fixed: true },
				{ strokeColor: '#006099', strokeWidth: 2, layer: 0, highlight: false, fixed: true }
			]
		},
		static: {
			main		: { strokeColor: '#10ABBF', strokeWidth: 1, layer: 0, highlight: false, fixed: true },
			aux			: { strokeColor: '#58A60A', strokeWidth: 1, layer: 0, highlight: false, fixed: true },
			highlight	: { strokeColor: '#D64640', strokeWidth: 1, layer: 0, highlight: false, fixed: true }
		},
		draft		: { strokeColor: '#CCC', strokeWidth: 1, dash: 2, layer: 0, highlight: false, fixed: true }
	},

	segment: {
		draft		: { strokeColor: '#CCC', strokeWidth: 1, dash: 2, layer: 0, highlight: false },
		static		: { strokeColor: '#333', strokeWidth: 1, layer: 0, highlight: false },
		dashed: {
			main		: { strokeColor: '#10ABBF', strokeWidth: 1, layer: 0, dash: 2, highlight: false },
			aux			: { strokeColor: '#58A60A', strokeWidth: 1, layer: 0, dash: 2, highlight: false },
			highlight	: { strokeColor: '#D64640', strokeWidth: 1, layer: 0, dash: 2, highlight: false },
			correct		: { strokeColor: '#398439', strokeWidth: 1, layer: 0, dash: 2, highlight: false },
			wrong		: { strokeColor: '#ac2925', strokeWidth: 1, layer: 0, dash: 2, highlight: false }
		},
		large: {
			main		: { strokeColor: '#10ABBF', strokeWidth: 2, layer: 0, highlight: false },
			aux			: { strokeColor: '#58A60A', strokeWidth: 2, layer: 0, highlight: false },
			highlight	: { strokeColor: '#D64640', strokeWidth: 2, layer: 0, highlight: false },
			static		: { strokeColor: '#333', strokeWidth: 2, layer: 0, highlight: false },
			draft		: { strokeColor: '#CCC', strokeWidth: 2, dash: 2, layer: 0, highlight: false }
		}
	},

	glider 			: { fixed: true, size: 2, visible: false },

	label: {
		main		: { strokeColor: '#10ABBF', highlight: false, fixed: true },
		aux			: { strokeColor: '#58A60A', highlight: false, fixed: true },
		highlight	: { strokeColor: '#D64640', highlight: false, fixed: true },
		draft		: { strokeColor: '#CCC', highlight: false, fixed: true },
		static		: { strokeColor: '#333', highlight: false, fixed: true },
		right: {
			main		: { strokeColor: '#10ABBF', highlight: false, anchorX: 'right', fixed: true },
			aux			: { strokeColor: '#58A60A', highlight: false, anchorX: 'right', fixed: true },
			highlight	: { strokeColor: '#D64640', highlight: false, anchorX: 'right', fixed: true },
			draft		: { strokeColor: '#CCC', highlight: false, fixed: true }
		},
		middle : {
			static		: { strokeColor: '#333', highlight: false, fixed: true, anchorX: 'middle' },
			main		: { strokeColor: '#10ABBF', highlight: false, anchorX: 'middle', fixed: true },
			aux			: { strokeColor: '#58A60A', highlight: false, anchorX: 'middle', fixed: true },
			highlight	: { strokeColor: '#D64640', highlight: false, anchorX: 'middle', fixed: true },
			draft		: { strokeColor: '#CCC', highlight: false, fixed: true }
		}
	},

	angle: {
		main		: { radius: 2, highlight: false, fillColor: '#10ABBF', strokeColor: '#10ABBF', label: { strokeColor: '#10ABBF', highlight: false } },
		aux			: { radius: 2, highlight: false, fillColor: '#58A60A', strokeColor: '#58A60A', label: { strokeColor: '#58A60A', highlight: false } },
		highlight	: { radius: 2, highlight: false, fillColor: '#D64640', strokeColor: '#D64640', label: { strokeColor: '#D64640', highlight: false } },
		draft		: { radius: 2, highlight: false, fillColor: '#CCC', strokeColor: '#CCC', label: { strokeColor: '#CCC', highlight: false } },
		right: {
			main		: { radius: 2, highlight: false, fillColor: '#10ABBF', strokeColor: '#10ABBF', label: { strokeColor: '#10ABBF', highlight: false, anchorX: 'right' } },
			aux			: { radius: 2, highlight: false, fillColor: '#58A60A', strokeColor: '#58A60A', label: { strokeColor: '#58A60A', highlight: false, anchorX: 'right' } },
			highlight	: { radius: 2, highlight: false, fillColor: '#D64640', strokeColor: '#D64640', label: { strokeColor: '#D64640', highlight: false, anchorX: 'right' } },
			draft		: { radius: 2, highlight: false, fillColor: '#CCC', strokeColor: '#CCC', label: { strokeColor: '#CCC', highlight: false, anchorX: 'right' } }
		}
	}
};

var _math = {
	isPrime: function ( number ) {
		if ( number == 2 ) {
			return false;
		}
		for ( var i = 2; i < number; i++ ) {
			if ( number % i == 0 ) {
				return false;
			}  
		}
		return true;
	},
	// retorna os divisores do número informado
	dividers: function ( number ) {
		var _arr = new Array(),
			_number = Math.abs( number );

		for ( var i = 0; i <= _number; i++ ) {
			if ( _number % i == 0 ) _arr.push( i );
		}

		return _arr;
	},

	// retorna o menor divisor do número informado
	leastFactor: function ( number ) {
		if ( isNaN(number) || !isFinite(number) ) return NaN;
		if ( number == 0 ) return 0;
		if ( number % 1 || number * number < 2 ) return 1;
		if ( number % 2 == 0 ) return 2;
		if ( number % 3 == 0 ) return 3;
		if ( number % 5 == 0 ) return 5;
		var m = Math.sqrt( number );
		for ( var i = 7; i <= m; i += 30 ) {
			if ( number % i == 0)			return i;
			if ( number % (i + 4) == 0 )	return i + 4;
			if ( number % (i + 6) == 0 )	return i + 6;
			if ( number % (i + 10) == 0 )	return i + 10;
			if ( number % (i + 12) == 0 )	return i + 12;
			if ( number % (i + 16) == 0 )	return i + 16;
			if ( number % (i + 22) == 0 )	return i + 22;
			if ( number % (i + 24) == 0 )	return i + 24;
		}
		return number;
	},
	
	// retorna um array com a fatoração do número informado
	factorize: function ( number ) {
		var _number = Math.abs( number ),
			leastFactor;

		if ( isNaN(number) || !isFinite(number) || number % 1 != 0 || number == 0 ) {
			return number;
		}
		
		leastFactor = this.leastFactor( _number );

		if ( _number == leastFactor ) {
			return number;
		}
		if ( number < 0 ) {
			leastFactor*=-1;
		}

		return [].concat.apply([], [ leastFactor, this.factorize( _number / leastFactor ) ] );
	},

	// retorna a fatoração em objeto com a tag html caso tenha o fill, retorna um objeto extra o filled, que igual o número de fatores dos elementos
	formatFactorized: function ( factorization, fill ) {
		var result = {};

		if ( typeof factorization != 'object' ) {
			result[ factorization ] = {
				number: factorization,
				count: 1,
				html: factorization.toString()
			}
		}

		for ( var i = 0; i < factorization.length; i++ ) {
			var n = factorization[i];

			if ( result[ n ] ) {
				result[ n ].count++;
				result[ n ].html = n + '<sup>' + result[ n ].count + '</sup>';
			} else {
				result[ n ] = {
					number: n,
					count: 1,
					html: n.toString()
				};
			}
		}

		if ( fill && typeof fill == 'object' ) {
			for ( var n in fill ) {
				if ( !result[ n ] ) {
					result[ n ] = {
						number: n,
						count: 0,
						html: n + '<sup>0</sup>'
					}
				}
			}
		}

		return result;
	},

	// retorna os menores factores comuns, para o cálculo do MDC
	smallestCommonFactors: function ( numbers, raw ) {
		if ( !numbers || !numbers.length ) return;

		var factors = [],
			result = [],
			commons;

		for ( var i = 0; i < numbers.length; i++ ) {
			factors.push( this.formatFactorized( this.factorize( numbers[i] ) ) );
		}

		commons = factors[0];

		for ( var n in commons ) {
			var remove = false;

			for ( var i = 1; i < factors.length; i++ ) {
				var factor = factors[i];

				if ( !factor[n] ) {
					remove = true;
					i = factors.length;
				} else if ( factor[n].count < commons[n].count ) {
					commons[n].count = factor[n].count;
				}
			}

			if ( remove ) {
				delete commons[n];
			}
		}

		if ( !raw ) return commons;

		for ( var n in commons ) {
			var entry = commons[n];

			for ( var i = 0; i < entry.count; i++ ) {
				result.push( entry.number );
			}
		}

		return result;
	},

	// retorna os maiores fatores, para cálculo do MMC
	largestFactors: function ( numbers, raw ) {
		if ( !numbers || !numbers.length ) return;

		var result = [],
			largests = {};

		for ( var i = 0; i < numbers.length; i++ ) {
			var factor = this.formatFactorized( this.factorize( numbers[i] ) );

			for ( var n in factor ) {
				var entry = factor[n];

				if ( !largests[n] || largests[n].count < entry.count ) {
					largests[n] = entry;
				}
			}
		}

		if ( !raw ) return largests;

		for ( var n in largests ) {
			var entry = largests[n];

			for ( var i = 0; i < entry.count; i++ ) {
				result.push( entry.number );
			}
		}

		return result;
	},
	MCD: function ( numbers ) {
		if ( numbers.length <= 1 ) return;

		var dividers	= new Array(),
			mcd;

		for ( var i = 0; i < numbers.length; i++ ) {
			dividers.push( this.dividers( parseInt( numbers[i] ) ) );
		}

		mcd = dividers[0];

		for ( var i = 1; i < dividers.length; i++ ) {
			var j		= 0,
				k		= 0,
				common	= new Array();

			while( j < mcd.length && k < dividers[i].length ) {
				if ( mcd[j] < dividers[i][k] ) {
					j++;
				}
				else if ( mcd[j] > dividers[i][k] ) {
					k++;
				}
				else { /* they're equal */
					common.push( mcd[j] );
					j++;
					k++;
				}
			}

			mcd = common;
		}

		return mcd[ mcd.length - 1 ];
	},
	MMC: function ( numbers ) {
		if ( !numbers || !numbers.length || numbers.length < 2 ) {
			return;
		}
		if ( numbers.indexOf(0) >= 0 ) {
			return 0;
		}
		var result = numbers[0];
			
		for( var i = 1; i < numbers.length; i++ ) {
			result = result*numbers[i]/this.MCD([result,numbers[i]]);
		}

		return result;
	},
	fromHexadecimal: function ( number ) {
		var n;

		switch ( number ) {
			case 'a':
			case 'A':
				n = 10;
			break;
			case 'b':
			case 'B':
				n = 11;
			break;
			case 'c':
			case 'C':
				n = 12;
			break;
			case 'd':
			case 'D':
				n = 13;
			break;
			case 'e':
			case 'E':
				n = 14;
			break;
			case 'f':
			case 'F':
				n = 15;
			break;
			default:
				n = parseInt( number );
			break;
		}

		return n;
	},
	toHexadecimal: function ( number ) {
		var n;

		switch ( number ) {
			case 10:
				n = 'A';
			break;
			case 11:
				n = 'B';
			break;
			case 12:
				n = 'C';
			break;
			case 13:
				n = 'D';
			break;
			case 14:
				n = 'E';
			break;
			case 15:
				n = 'F';
			break;
			default:
				n = parseInt( number );
			break;
		}

		return n;
	},
	fromBase10: function ( number, base ) {
		var numbers = [],
			_x = number;

		for ( var i = 0; _x >= base; i++ ) {

			var __x = Math.floor( _x/base ),
				_rest = __x*base,
				_amount = _x - _rest;

			numbers.push({
				number: _x,
				index: i,
				rest: _rest,
				amount: _amount,
				hex: _math.toHexadecimal( _amount )
			});

			_x = __x;
		}

		numbers.push({
			number: _x,
			index: numbers.length,
			amount: _x,
			hex: _math.toHexadecimal( _x )
		});

		return numbers;
	},
	toBase10: function ( number, base ) {
		if ( !number ) return;

		var numbers = number.toString().split(''),
			result = [];

		for (var i = 0; i < numbers.length; i++) {
			var index = numbers.length - i - 1,
				pow = Math.pow( base, index ),
				_number = this.fromHexadecimal( numbers[i] );

			result.push({
				index: index,
				pow: pow,
				number: _number,
				amount: pow * _number
			});
		}

		return result;
	},
	powsOnBase10: function ( until, base ) {
		var bases = [],
			_pow = 0;

		for ( var i = 0; _pow < until; i++ ) {
			_pow = Math.pow( base, i );

			bases.push({
				index: i,
				pow: _pow
			});
		}

		return bases;
	},
	briotRuffini: function ( values, value ) {
		var briot = [];

		for ( var i = 0; i < values.length; i++ ) {
			var _value = values[i],
				_number = briot[i-1] ? briot[i-1].rest*value : 0;

			briot.push({
				value: _value,
				number: briot[i-1] ? _number : null,
				rest: _value - _number
			});
		}

		return briot;
	},
	divide: function ( dividend_, divisor, length ) {
		
		var result = [],
			dividend = dividend_,
			ref = dividend_,
			quotient,
			rest,
			rests = [],
			_quotient = '',
			count = 0;

		while ( rest != ref && rest*10 != ref && rest != 0 && ( length && count < length ) ) {

			if ( count++ > 30 ) {
				console.error('divide timeout', _quotient, result);
				break;
			}

			var _dividend = dividend;

			if ( dividend < divisor ) {
				dividend *= 10;
				if ( !_quotient ) {
					_quotient = '0.';

					result.push({
						_dividend: _dividend,
						dividend: _dividend,
						divisor: divisor,
						integer: 0,
						quotient: 0,
						rest: _dividend
					});

				} else if ( _quotient.indexOf('.') < 0 ) {
					_quotient += '.';
				}
			}

			quotient = Math.floor( dividend/divisor );
			rest = dividend%divisor;

			if ( rests.indexOf( rest ) >= 0 ) {
				ref = rest;
			} else {
				rests.push( rest );
			}

			result.push({
				quotient: quotient,
				rest: rest,
				integer: divisor*quotient,
				dividend: dividend,
				_dividend: _dividend,
				divisor: divisor
			});

			_quotient += quotient;

			dividend = rest;
		}

		return {
			ref: ref,
			quotient: parseFloat( _quotient ),
			math: result
		};
	},
	polynomial: {
		divide: function ( dividend, divisor ) {
			var result = [],
				length = dividend.length - divisor.length + 1;

			if ( !dividend || !divisor || !dividend.length || !divisor.length || dividend.length < divisor.length ) return result;

			for ( var i = 0; i < length; i++ ) {
				var _curr = result.length ? result[result.length-1].rest[0] : dividend[0],
					_quotient = {
						value: _curr.value/divisor[0].value,
						index: _curr.index-divisor[0].index
					},
					_number = [],
					_subtraction = [],
					_rest;

				for ( var j = 0; j < divisor.length; j++ ) {
					_number.push( result.length ? result[result.length-1].rest[j] : dividend[j] );
					_subtraction.push({
						value: _quotient.value * divisor[j].value,
						index : _quotient.index + divisor[j].index
					});
				}

				// corta o primeiro resultado
				_rest = this.subtract([ _number, _subtraction ]).slice(1,divisor.length);

				// desce os valores do dividendo para o resto
				for ( var j = 0; j < divisor.length-_rest.length; j++ ) {
					var n = dividend[ divisor.length+i+j ];
					if ( n ) {
						_rest.push( n );
					}
				}

				result.push({
					number: _number,
					rest: _rest,
					subtraction: _subtraction,
					quotient: _quotient
				});
			}

			return result;
		},
		multiply: function ( polynoms ) {
			var result = [];

			for (var i = 0; i < polynoms.length; i++) {
				var polynom = polynoms[i];

				for (var j = 0; j < polynom.length; j++) {
					var n = polynom[j];

					for (var k = 0; k < polynoms.length; k++) {
						var _polynom = polynoms[k],
							polynom_ = [];

						if ( !_.isEqual(_polynom,polynom) ) {
							for (var l = 0; l < _polynom.length; l++) {
								var v = _polynom[l].value;
								polynom_.push({
									value: $.isArray( v ) || $.isArray( n.value ) ? _math.fraction.multiply( [ v, n.value ] ) : v * n.value,
									index: _polynom[l].index + n.index
								})
							}
						}
					}

					if ( polynom_.length ) {
						result.push({
							result: polynom_,
							polynom: _polynom,
							n: n
						});
					}
				}
			}

			return result;
		},
		add: function ( polynoms ) {
			return this.subtract( polynoms, true );
		},
		subtract: function ( polynoms, add ) {
			var result = [],
				size = 0;

			// qual o polinômio com o maior grau
			for ( var i = 0; i < polynoms.length; i++ ) {
				if ( polynoms[i][0].index+1 > size ) {
					size = polynoms[i][0].index+1;
				}
			}

			// para cada grau baseado no maior polinômio
			for ( var i = 0; i < size; i++ ) {
				var index = size-i-1,
					value = 0;

				// para cada polinômio
				for ( var j = 0; j < polynoms.length; j++ ) {
					var polynom = polynoms[j];

					// para cada valor do polinomio
					for ( var k = 0; k < polynom.length; k++ ) {
						var _value = polynom[k];

						// caso encontre um valor com o mesmo index do maior polinômio
						if ( _value.index == index ) {
							// atribui o valor ao grau
							if ( !value ) {
								value = j && !add ? ( $.isArray( _value.value ) ? [-_value.value[0],_value.value[1]] : -_value.value ) : _value.value;
							// ou subtrai do valor do grau
							} else {
								// caso seja fração, faz operação da fração
								if ( $.isArray( value ) || $.isArray( _value.value ) ) {
									value = _math.fraction.subtract([ value, _value.value ], add );
								} else {
									if ( add ) {
										value += _value.value;
									} else {
										value -= _value.value;
									}
								}
							}
							// sai da repetição dos valores para o grau
							k = polynom.length;
						}
					}
				}

				// adiciona o resultado na primeira posição
				result.push({
					value: value,
					index: index
				});
			}

			return result;
		}
	},
	fraction: {
		add: function ( fractions ) {
			return this.subtract( fractions, true );
		},
		subtract: function ( fractions, add ) {
			var _ds = [],
				n, m;

			for ( var i = 0; i < fractions.length; i++ ) {
				_ds[i] = $.isArray( fractions[i] ) ? fractions[i][1] : 1;
			}

			m = _math.MMC(_ds);

			for ( var i = 0; i < fractions.length; i++ ) {
				var _n = m / ( $.isArray( fractions[i] ) ? fractions[i][1] : 1 ) * ( $.isArray( fractions[i] ) ? fractions[i][0] : fractions[i] );
				if ( !n ) {
					n = _n;
				} else {
					if ( add ) {
						n += _n;
					} else {
						n -= _n;
					}
				}
			}

			return n == 0 ? m : [n,m];
		},
		multiply: function ( fractions ) {
			var _fractions = [],
				n = 1,
				d = 1;

			for ( var i = 0; i < fractions.length; i++ ) {
				_fractions[i] = $.isArray( fractions[i] ) ? fractions[i] : [ fractions[i], 1 ];
			}

			for ( var i = 0; i < _fractions.length; i++ ) {
				n *= _fractions[i][0];
				d *= _fractions[i][1];
			}

			return [n,d];
		},
		divide: function ( /* fractions */ ) {

		}
	},
	factorial: function ( number ) {
		var result = number;

		while ( number > 1 ) {
			result *= --number;
		}

		return result;
	},
	permute: function ( v, m, c ) {
		for(var p = -1, j, k, f, r, l = v.length, q = 1, i = l + 1; --i; q *= i);
		for(x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1;++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
		for(r = new Array(q); ++p < q;)
		for(r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i],x[2][i] = (x[2][i] + 1) % l), r[p][i] = m ? x[3][i] : v[x[3][i]])
		for(x[3][i] = x[2][i], f = 0; !f; f = !f)
		for(j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));
		return c ? r.slice( 0, this.factorial(l-1) ) : r;
	}
};

Array.prototype.compare = function ( array ) {
	if ( !array || this.length != array.length ) {
		return false;
	}
	for ( var i = 0, l=this.length; i < l; i++ ) {
		if (this[i] instanceof Array && array[i] instanceof Array) {
			if (!this[i].compare(array[i])) {
				return false;
			}
		} else if (this[i] != array[i]) {
			return false;
		}
	}
	return true;
};