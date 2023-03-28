/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var h = "function" == typeof Object.defineProperties ? Object.defineProperty : function ( a, b, c )
{
	a != Array.prototype && a != Object.prototype && ( a[ b ] = c.value )
};

function l( a )
{
	a = [ "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a ];
	for ( var b = 0; b < a.length; ++b )
	{
		var c = a[ b ];
		if ( c && c.Math == Math ) return c
	}
	throw Error( "Cannot find global object" );
}
var n = l( this );

function t( a, b )
{
	if ( b )
	{
		var c = n;
		a = a.split( "." );
		for ( var d = 0; d < a.length - 1; d++ )
		{
			var e = a[ d ];
			e in c || ( c[ e ] = {} );
			c = c[ e ]
		}
		a = a[ a.length - 1 ];
		d = c[ a ];
		b = b( d );
		b != d && null != b && h( c, a,
		{
			configurable: !0,
			writable: !0,
			value: b
		} )
	}
}

function u( a )
{
	var b = 0;
	return function ()
	{
		return b < a.length ?
		{
			done: !1,
			value: a[ b++ ]
		} :
		{
			done: !0
		}
	}
}

function w()
{
	w = function () {};
	n.Symbol || ( n.Symbol = x )
}

function y( a, b )
{
	this.h = a;
	h( this, "description",
	{
		configurable: !0,
		writable: !0,
		value: b
	} )
}
y.prototype.toString = function ()
{
	return this.h
};
var x = function ()
{
	function a( c )
	{
		if ( this instanceof a ) throw new TypeError( "Symbol is not a constructor" );
		return new y( "jscomp_symbol_" + ( c || "" ) + "_" + b++, c )
	}
	var b = 0;
	return a
}();

function z()
{
	w();
	var a = n.Symbol.iterator;
	a || ( a = n.Symbol.iterator = n.Symbol( "Symbol.iterator" ) );
	"function" != typeof Array.prototype[ a ] && h( Array.prototype, a,
	{
		configurable: !0,
		writable: !0,
		value: function ()
		{
			return A( u( this ) )
		}
	} );
	z = function () {}
}

function A( a )
{
	z();
	a = {
		next: a
	};
	a[ n.Symbol.iterator ] = function ()
	{
		return this
	};
	return a
}
t( "String.prototype.matchAll", function ( a )
{
	if ( a ) return a;
	z();
	return function ( b )
	{
		if ( b instanceof RegExp && !b.global ) throw new TypeError( "RegExp passed into String.prototype.matchAll() must have global tag." );
		var c = new RegExp( b, b instanceof RegExp ? void 0 : "g" ),
			d = this,
			e = !1,
			g = {
				next: function ()
				{
					var f = {},
						k = c.lastIndex;
					if ( e ) return {
						value: void 0,
						done: !0
					};
					var m = c.exec( d );
					if ( !m ) return e = !0,
					{
						value: void 0,
						done: !0
					};
					c.lastIndex === k && ( c.lastIndex += 1 );
					f.value = m;
					f.done = !1;
					return f
				}
			};
		g[ Symbol.iterator ] = function ()
		{
			return g
		};
		return g
	}
} );
var B = Date.now || function ()
{
	return +new Date
};
var C = {},
	D = null;
/*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/
var E = a => new Promise( ( b, c ) =>
	{
		let d = a.length,
			e = null;
		if ( d )
		{
			var g = ( f, k ) =>
			{
				f || e || ( e = k );
				d--;
				d || ( e ? c( e ) : b() )
			};
			for ( const f of a ) f.then( g.bind( null, !0 ), g.bind( null, !1 ) )
		}
		else b()
	} ),
	F = a => self.btoa( String.fromCharCode.apply( null, new Uint8Array( a ) ) ).replace( /\+/g, "-" ).replace( /\//g, "_" );
var G = class extends Error
{
	constructor( a, ...b )
	{
		super( a );
		this.args = [ ...b ]
	}
};
let H = null;

function I( a, b )
{
	const c = {};
	c.key = a;
	c.value = b;
	return J().then( d => new Promise( ( e, g ) =>
	{
		try
		{
			const f = d.transaction( "swpushnotificationsstore", "readwrite" ).objectStore( "swpushnotificationsstore" ).put( c );
			f.onsuccess = () =>
			{
				e()
			};
			f.onerror = () =>
			{
				g()
			}
		}
		catch ( f )
		{
			g( f )
		}
	} ) )
}

function K()
{
	return I( "IndexedDBCheck", "testing IndexedDB" ).then( () => L( "IndexedDBCheck" ) ).then( a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject() ).then( () => !0 ).catch( () => !1 )
}

function L( a )
{
	const b = new G( "Error accessing DB" );
	return J().then( c => new Promise( ( d, e ) =>
	{
		try
		{
			const g = c.transaction( "swpushnotificationsstore" ).objectStore( "swpushnotificationsstore" ).get( a );
			g.onsuccess = () =>
			{
				const f = g.result;
				d( f ? f.value : null )
			};
			g.onerror = () =>
			{
				b.params = {
					key: a,
					source: "onerror"
				};
				e( b )
			}
		}
		catch ( g )
		{
			b.params = {
				key: a,
				thrownError: String( g )
			}, e( b )
		}
	} ), () => null )
}

function J()
{
	return H ? Promise.resolve( H ) : new Promise( ( a, b ) =>
	{
		const c = self.indexedDB.open( "swpushnotificationsdb" );
		c.onerror = b;
		c.onsuccess = () =>
		{
			const d = c.result;
			if ( d.objectStoreNames.contains( "swpushnotificationsstore" ) ) H = d, a( H );
			else return self.indexedDB.deleteDatabase( "swpushnotificationsdb" ), J()
		};
		c.onupgradeneeded = M
	} )
}

function M( a )
{
	a = a.target.result;
	a.objectStoreNames.contains( "swpushnotificationsstore" ) && a.deleteObjectStore( "swpushnotificationsstore" );
	a.createObjectStore( "swpushnotificationsstore",
	{
		keyPath: "key"
	} )
};

function N()
{
	return self.clients.matchAll(
	{
		type: "window",
		includeUncontrolled: !0
	} ).then( a =>
	{
		if ( a )
			for ( const b of a ) b.postMessage(
			{
				type: "update_unseen_notifications_count_signal"
			} )
	} )
}

function O( a )
{
	if ( !( a.payload && a.payload.chrome && a.payload.chrome.endpoint ) ) return Promise.resolve();
	const b = new FormData;
	b.append( "json_navigation_endpoints", JSON.stringify( [ a.payload.chrome.endpoint ] ) );
	let c = "[]";
	a.payload.chrome.extraUrlParams && ( c = JSON.stringify( a.payload.chrome.extraUrlParams ) );
	b.append( "extra_url_params", c );
	b.append( "hashed_identifier", a.hashedIdentifier || "" );
	b.append( "identifier_salt", a.identifierSalt || "" );
	return fetch( "/notifications_ajax?action_convert_endpoint_to_url=1",
	{
		credentials: "include",
		method: "POST",
		body: b
	} ).then( d => d.ok ? d.json().then( e =>
	{
		if ( !e.successful_conversion ) return Promise.resolve();
		if ( a.payload.chrome.postedEndpoint )
		{
			{
				var g = a.payload.chrome.postedEndpoint;
				const f = new FormData;
				f.append( "record_notification_interactions_endpoint", JSON.stringify( g ) );
				fetch( "/notifications_ajax?action_record_notification_interactions=1",
				{
					credentials: "include",
					method: "POST",
					body: f
				} )
			}
		}
		return P( a, e.url )
	} ).catch( () => Promise.resolve() ) : Promise.resolve() )
}

function P( a, b )
{
	a.deviceId && I( "DeviceId", a.deviceId );
	a.timestampSec && Q( a.timestampSec );
	const c = a.payload.chrome;
	return self.registration.showNotification( c.title,
	{
		body: c.body,
		icon: c.iconUrl,
		data:
		{
			nav: b,
			id: c.notificationId,
			attributionTag: c.attributionTag
		},
		tag: c.title + c.body + c.iconUrl,
		requireInteraction: !0
	} ).then( () =>
	{
		R( a.displayCap )
	} ).catch( () =>
	{} )
}

function S( a )
{
	return L( "DeviceId" ).then( b =>
	{
		b = {
			credentials: "include",
			method: "POST",
			body: T(
			{
				deviceId: b,
				c: a
			} )
		};
		return fetch( "/notifications_ajax?action_notification_click=1", b )
	} )
}

function U()
{
	return Promise.all( [ L( "TimestampLowerBound" ), V(), L( "DeviceId" ) ] ).then( ( [ a, b, c ] ) =>
	{
		if ( !a ) return Promise.reject( null );
		a = {
			credentials: "include",
			method: "POST",
			body: T(
			{
				endpoint: b,
				deviceId: c,
				ts: a
			} )
		};
		return fetch( "/notifications_ajax?action_get_notifications=1", a ).then( W )
	} )
}

function W( a )
{
	return a.ok ? a.json().then( aa ).catch( () =>
	{} ) : Promise.resolve()
}

function aa( a )
{
	if ( a.errors ) return Promise.reject( a.errors );
	a.device_id && I( "DeviceId", a.device_id );
	a.ts && Q( a.ts );
	if ( a.notifications )
	{
		const b = [];
		a.notifications.forEach( c =>
		{
			b.push( self.registration.showNotification( c.title,
			{
				body: c.message,
				icon: c.iconUrl,
				data:
				{
					nav: c.nav,
					id: c.id,
					attributionTag: c.attributionTag
				},
				tag: c.title + c.message + c.iconUrl,
				requireInteraction: c.requireInteraction
			} ) )
		} );
		return E( b ).then( () =>
		{
			R( a.display_cap )
		} )
	}
	return Promise.resolve()
}

function R( a )
{
	-1 !== a && self.registration.getNotifications().then( b =>
	{
		for ( let c = 0; c < b.length - a; c++ ) b[ c ].close()
	} )
}

function ba( a )
{
	const b = [ ca( a ), L( "RegistrationTimestamp" ).then( da ), ea(), fa(), ha() ];
	Promise.all( b ).catch( () =>
	{
		I( "IDToken", a );
		X();
		return Promise.resolve()
	} )
}

function da( a )
{
	a = a || 0;
	return 9E7 >= B() - a ? Promise.resolve() : Promise.reject()
}

function ca( a )
{
	return L( "IDToken" ).then( b => a === b ? Promise.resolve() : Promise.reject() )
}

function ea()
{
	return L( "Permission" ).then( a => Notification.permission === a ? Promise.resolve() : Promise.reject() )
}

function fa()
{
	return L( "Endpoint" ).then( a => V().then( b => a === b ? Promise.resolve() : Promise.reject() ) )
}

function ha()
{
	return L( "application_server_key" ).then( a => Y().then( b => a === b ? Promise.resolve() : Promise.reject() ) )
}

function X()
{
	I( "RegistrationTimestamp", 0 );
	Promise.all( [ V(), ia(), ja(), Y() ] ).then( ( [ a, b, c, d ] ) =>
	{
		b = b ? F( b ) : null;
		c = c ? F( c ) : null;
		if ( d )
		{
			d = new Uint8Array( d );
			var e = 4;
			void 0 === e && ( e = 0 );
			if ( !D )
			{
				D = {};
				for ( var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split( "" ), f = [ "+/=", "+/", "-_=", "-_.", "-_" ], k = 0; 5 > k; k++ )
				{
					var m = g.concat( f[ k ].split( "" ) );
					C[ k ] = m;
					for ( var q = 0; q < m.length; q++ )
					{
						var p = m[ q ];
						void 0 === D[ p ] && ( D[ p ] = q )
					}
				}
			}
			e = C[ e ];
			g = [];
			for ( f = 0; f < d.length; f += 3 )
			{
				var v = d[ f ],
					r = ( k = f + 1 < d.length ) ? d[ f + 1 ] : 0;
				p = ( m = f +
					2 < d.length ) ? d[ f + 2 ] : 0;
				q = v >> 2;
				v = ( v & 3 ) << 4 | r >> 4;
				r = ( r & 15 ) << 2 | p >> 6;
				p &= 63;
				m || ( p = 64, k || ( r = 64 ) );
				g.push( e[ q ], e[ v ], e[ r ] || "", e[ p ] || "" )
			}
			d = g.join( "" )
		}
		else d = null;
		Z( a, b, c, d )
	} ).catch( () =>
	{
		Z()
	} )
}

function Z( a = null, b = null, c = null, d = null )
{
	K().then( e =>
	{
		e && ( I( "Endpoint", a ), I( "P256dhKey", b ), I( "AuthKey", c ), I( "application_server_key", d ), I( "Permission", Notification.permission ), Promise.all( [ L( "DeviceId" ), L( "NotificationsDisabled" ), ka() ] ).then( ( [ g, f, k ] ) =>
		{
			g = {
				credentials: "include",
				method: "POST",
				body: T(
				{
					endpoint: a,
					deviceId: g,
					f,
					p256dhKey: b,
					authKey: c,
					applicationServerKey: d,
					g: k
				} )
			};
			fetch( "/notifications_ajax?action_register_device=1", g ).then( la ).catch( () =>
			{} )
		} ) )
	} )
}

function T( a )
{
	const b = new FormData;
	a.endpoint && b.append( "endpoint", a.endpoint );
	a.deviceId && b.append( "device_id", a.deviceId );
	a.ts && b.append( "timestamp_lower_bound", a.ts );
	a.c && ( b.append( "notification_id", a.c.id ), b.append( "attribution_tag", a.c.attributionTag ) );
	a.f && b.append( "notifications_disabled", ( !!a.f ).toString() );
	a.p256dhKey && b.append( "p256dh_key", a.p256dhKey );
	a.authKey && b.append( "auth_key", a.authKey );
	a.applicationServerKey && b.append( "application_server_key", a.applicationServerKey );
	a.g && b.append( "registration_token",
		a.g );
	b.append( "permission", Notification.permission );
	return b
}

function la( a )
{
	I( "RegistrationTimestamp", B() );
	a.ok && a.json().then( b =>
	{
		b.ts && Q( b.ts );
		b.device_id && I( "DeviceId", b.device_id )
	} ).catch( () =>
	{} )
}

function V()
{
	return self.registration.pushManager.getSubscription().then( a => a ? Promise.resolve( a.endpoint ) : Promise.resolve( null ) )
}

function ia()
{
	return self.registration.pushManager.getSubscription().then( a => a && a.getKey ? Promise.resolve( a.getKey( "p256dh" ) ) : Promise.resolve( null ) )
}

function ja()
{
	return self.registration.pushManager.getSubscription().then( a => a && a.getKey ? Promise.resolve( a.getKey( "auth" ) ) : Promise.resolve( null ) )
}

function Y()
{
	return self.registration.pushManager.getSubscription().then( a => a ? Promise.resolve( a.options.applicationServerKey ) : Promise.resolve( null ) )
}

function ka()
{
	return fetch( "/notifications_ajax?action_get_registration_token=1",
	{
		credentials: "include",
		method: "POST"
	} ).then( a =>
	{
		if ( a.ok ) return a.json().then( b => b.registration_token ).catch( () =>
		{} )
	} )
}

function Q( a )
{
	I( "TimestampLowerBound", a )
};
self.oninstall = function ( a )
{
	a.waitUntil( self.skipWaiting() )
};
self.onactivate = function ( a )
{
	a.waitUntil( self.clients.claim() )
};
self.onmessage = function ( a )
{
	var b = a.data;
	a = b.type;
	b = b.data;
	"notifications_register" === a ? ( I( "IDToken", b ), X() ) : "notifications_check_registration" === a && ba( b )
};
self.onnotificationclick = function ( a )
{
	a.notification.close();
	const b = a.notification.data,
		c = self.clients.matchAll(
		{
			type: "window",
			includeUncontrolled: !0
		} );
	c.then( d =>
	{
		a:
		{
			var e = b.nav;
			for ( const g of d )
				if ( g.url === e )
				{
					g.focus();
					break a
				} self.clients.openWindow( e )
		}
	} );
	a.waitUntil( c );
	a.waitUntil( S( b ) )
};
self.onpush = function ( a )
{
	a.waitUntil( L( "NotificationsDisabled" ).then( b =>
	{
		if ( b ) return Promise.resolve();
		if ( a.data && a.data.text().length ) try
		{
			return O( a.data.json() )
		}
		catch ( c )
		{
			return Promise.resolve( c.message )
		}
		return U()
	} ) );
	a.waitUntil( N() )
};
self.onpushsubscriptionchange = function ()
{
	X()
};