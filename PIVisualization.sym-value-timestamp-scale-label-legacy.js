// <copyright file="PIVisualization.sym-value-label-legacy.js" company="OSIsoft, LLC">
// Copyright © 2015-2016 OSIsoft, LLC. All rights reserved.
// THIS SOFTWARE CONTAINS CONFIDENTIAL INFORMATION AND TRADE SECRETS OF OSIsoft, LLC.
// USE, DISCLOSURE, OR REPRODUCTION IS PROHIBITED WITHOUT THE PRIOR EXPRESS WRITTEN
// PERMISSION OF OSIsoft, LLC.
//
// RESTRICTED RIGHTS LEGEND
// Use, duplication, or disclosure by the Government is subject to restrictions
// as set forth in subparagraph (c)(1)(ii) of the Rights in Technical Data and
// Computer Software clause at DFARS 252.227.7013
//
// OSIsoft, LLC.
// 777 Davis Street, Suite 250, San Leandro CA 94577
// </copyright>

/// <reference path="../_references.js" chutzpah-exclude="true" />

window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    function convertLegacyFriendlyName(legacySym, config) {
        if (legacySym.SymbolLabel) {
            if (legacySym.SymbolLabel.NameFormat === 'UserEntered') {
                config.NameType = 'C';
                config.CustomName = legacySym.SymbolLabel.UserEnteredName;
            } else if (legacySym.SymbolLabel.NameFormat === 'Description') {
                config.NameType = 'D';
            } else if (legacySym.SymbolLabel.NameFormat === 'AttributeNameOnly') {
                config.NameType = 'P';
            }
        } else {
            config.NameType = 'F';
        }

        // hide time stamp for value symbols in SL-converted displays
        if (legacySym.Type.toLowerCase() === 'value') {
            config.ShowTime = false;
        }

        return config;
    }

    // get the symbol config for supported types and inject getConfigFromLegacy
    ['value', 'verticalgauge', 'horizontalgauge', 'radialgauge'].forEach(function (symbolType) {
        var def = PV.symbolCatalog.getDefinition(symbolType);

        // Chain to existing converter if it exists
        var converter = def.getConfigFromLegacy || def.getDefaultConfig;
        def.getConfigFromLegacy = function (legacySym, symbolType) {
            var config = converter(legacySym, symbolType);
            return convertLegacyFriendlyName(legacySym, config);
        };
    });

})(window.PIVisualization);
