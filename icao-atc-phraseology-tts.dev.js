"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  /**
   * Cloning contents from a &lt;template&gt; element is more performant
   * than using innerHTML because it avoids addtional HTML parse costs.
   */
  var template = document.createElement('template');
  styles = "\n    <style>\n\n      ::slotted(.atc) {\n        color: #c25502;\n      }\n      ::slotted(.atc)::before {\n        color: white;\n        content: \"atc\";\n        background: #c25502;\n        padding: 3px;\n        border-radius: 4px;\n        margin-right: 1em;\n        font-family: Lato;\n        font-style: normal;\n      }\n\n      ::slotted(.acft) {\n        color: #0000cd;\n      }\n      ::slotted(.acft)::before {\n        content: \"\u2708\uFE0F\";\n        border: 1px solid rgba(0, 0, 205, 0.4);\n        border-radius: 4px;\n        padding: 2px;\n        margin-right: 1em;\n        font-family: Lato;\n        font-style: normal;\n      }\n\n      ::slotted(div.atc), ::slotted(div.acft) {\n        margin: 1em 0 1em 1em;\n        font-family: monospace;\n        font-size: 1rem;\n        user-select: none;\n      }\n\n      label {\n        display: inline-block;\n        width: 150px;\n      }\n      select, input {\n        background: inherit;\n        color: inherit;\n        border: solid 1px #666666 \n      }\n\n      details[open] {\n        background: #eeeeee;\n        padding: 0.5em;\n      }\n\n      #ttsSettings > div{\n        margin-top: 1em;\n      }\n      #ttsSettings label{\n        display: inline-block;\n        width: 150px;\n        color: grey;\n        font-style: italic;\n      }\n      #yourCallsign {\n        width: 10ch;\n      }\n      @media (prefers-color-scheme: dark){\n        details[open] {\n          background: #222222;\n        }\n        \n        option, input {\n          background: #222222;\n        }\n      }\n    </style>";
  template.innerHTML = styles + "\n    <details>\n      <summary>\u26A0\uFE0F voices &amp; callsign</summary>\n      <div id=\"ttsSettings\">\n        <div>\n          <label for=\"acftVoiceSelect\">Aircraft voice</label>\n          <select id=\"acftVoiceSelect\"></select>\n        </div>\n        <div>\n          <label for=\"atcVoiceSelect\">ATC voice</label>\n          <select id=\"atcVoiceSelect\"></select>\n        </div>\n        <div>\n          <label for=\"yourCallsign\">choose your callsign</label>\n          <input id=\"yourCallsign\" type=\"text\" value=\"" + localStorage.getItem("callsign") + "\">\n          <p>Die Liste realistischer Callsigns findet ihr unter <a href=\"https://www.avcodes.co.uk/airlcodesearch.asp\" target=\"airlinecodes\">https://www.avcodes.co.uk/airlcodesearch.asp</a>\n            <div id=\"errorText\"></div>\n          </p>\n        </div>        \n      </div>\n    </details>\n    <slot>to make use of this TTS element, just add child elements of classes either 'atc' or 'acft' within this tag.</slot></div>";

  var icaoAtcPhraseologyTts =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(icaoAtcPhraseologyTts, _HTMLElement);

    /**
     * The element's constructor is run anytime a new instance is created.
     * Instances are created either by parsing HTML, calling
     * document.createElement('icao-atc-phraseology-tts'), or calling new HowToCheckbox();
     * The construtor is a good place to create shadow DOM, though you should
     * avoid touching any attributes or light DOM children as they may not
     * be available yet.
     */
    function icaoAtcPhraseologyTts() {
      var _this2;

      _classCallCheck(this, icaoAtcPhraseologyTts);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(icaoAtcPhraseologyTts).call(this));
      var voices = [];

      _this2.attachShadow({
        mode: 'open'
      });

      _this2.shadowRoot.appendChild(template.content.cloneNode(true));

      var ttsSettings = _this2.shadowRoot.querySelector("#ttsSettings");

      var atcVoiceSelect = _this2.shadowRoot.querySelector("#atcVoiceSelect");

      var acftVoiceSelect = _this2.shadowRoot.querySelector("#acftVoiceSelect");

      var callsignSelect = _this2.shadowRoot.querySelector("#yourCallsign");

      var slotElement = document.querySelectorAll('.atc');
      var sanitizedWord = "";
      var currentCallsign = "DLH22G";
      var synth = speechSynthesis,
          isSpeaking = true;
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var atcVoice = localStorage.getItem("atcVoice") !== (null && '') ? localStorage.getItem("atcVoice") : 0;
      var acftVoice = localStorage.getItem("acftVoice") !== (null && '') ? localStorage.getItem("acftVoice") : 1;
      var callsign = localStorage.getItem("callsign") !== (null || '') ? localStorage.getItem("callsign") : "DLH22G";
      callsignSelect.value = callsign;

      function replaceCallsign() {
        var callsign = urlParams.get('callsign');
        callsign = urlParams.get('callsign') !== (null && "") ? urlParams.get('callsign') : "DLH22G";
        callsign = callsignSelect.value !== '' ? callsignSelect.value : callsign;
        console.log("-----\ncallsign\t" + callsign + "\ncurrentCallsign\t" + currentCallsign);

        if (callsign.match(/^([A-Za-z]{1,3}([A-Za-z0-9]{1,6}))$/)) {
          var getAllTextNodes = function getAllTextNodes() {
            var result = [];

            (function scanSubTree(node) {
              if (node.childNodes.length) for (var i = 0; i < node.childNodes.length; i++) {
                scanSubTree(node.childNodes[i]);
              } else if (node.nodeType == Node.TEXT_NODE) result.push(node);
            })(document);

            return result;
          };

          var quote = function quote(str) {
            return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
          };

          getAllTextNodes().forEach(function (node) {
            node.nodeValue = node.nodeValue.replace(new RegExp(quote(currentCallsign), 'g'), callsign.toUpperCase());
          });
          currentCallsign = callsign.toUpperCase();
          localStorage.setItem("callsign", currentCallsign);
        } else {
          var errorText = "Dein callsign '" + callsign.toUpperCase() + "' ist noch nicht ICAO konform.<br>Bitte wähle eines das mit drei Buchstaben für die Airline beginnt, und dann 1-4 weitere Buchstaben oder Ziffern hat.<br>Solange verwenden wir im Text weiterhin " + currentCallsign + "."; //this.shadowRoot.querySelector("#errorText").innerHTML = errorText;
        }
      }

      function getCharPhonetics(_char) {
        var natoAlphabet = {
          "A": "alpha",
          "B": "bravo",
          "C": "charly",
          "D": "delta",
          "E": "echo",
          "F": "foxtrott",
          "G": "golf",
          "H": "hotel",
          "I": "india",
          "J": "juliett",
          "K": "kilo",
          "L": "lima",
          "M": "mike",
          "N": "november",
          "O": "oscar",
          "P": "papa",
          "Q": "quebeck",
          "R": "romeo",
          "S": "sierra",
          "T": "tango",
          "U": "uniform",
          "V": "victor",
          "W": "whiskey",
          "X": "x-ray",
          "Y": "yankee",
          "Z": "zulu",
          "0": "zero",
          "1": "one",
          "2": "two",
          "3": "trih",
          "4": "four",
          "5": "five",
          "6": "siks",
          "7": "seven",
          "8": "eight",
          "9": "niner",
          "°": "degrees"
        };
        var speak = natoAlphabet[_char.toUpperCase()] ? natoAlphabet[_char] : _char;
        return speak + " ";
      }

      function getRunwayPhonetics(_char2) {
        var natoAlphabet = {
          "C": "center",
          "L": "left",
          "R": "right"
        };
        var speak = natoAlphabet[_char2.toUpperCase()] ? natoAlphabet[_char2] : _char2;
        return speak + " ";
      }

      function getOperatorPhonetics(operatorCode) {
        var operators = {
          "AAL": "American",
          "AEE": "Aegean",
          "AFR": "Air France",
          "ANA": "All Nippon",
          "AUA": "Austrian",
          "BAW": "Speedbird",
          "BEL": "Beeline",
          "BER": "Air Berlin",
          "CFG": "Condor",
          "CPA": "Cathay",
          "CSN": " China Southern",
          "DAL": "Delta",
          "DLH": "Lufthansa",
          "ETD": "Etihad",
          "EWG": "Eurowings",
          "EZY": "Easy",
          "FSC": "Four Star",
          "GAF": " German Air Force",
          "IBE": "Iberia",
          "ITY": "Itarrow",
          "KLM": "K L M",
          "LXP": "Lanes",
          "MAF": "Missi",
          "NAX": "Nor Shuttle",
          "NJU": "ExecJet",
          "NJT": "ExecJet",
          "OAL": "Olympic",
          "QFA": "Quantas",
          "QTR": "Qatari",
          "RYR": "Ryanair",
          "SAA": "Springbok",
          "SWA": "Southwest",
          "SWR": "Swiss",
          "TAM": "T A M",
          "TAP": "Air Portugal",
          "THY": "Turkish",
          "UAE": "Emirates",
          "UAL": "United",
          "VLG": "Vueling",
          "VOI": "Volaris",
          "WZZ": "Wizz Air"
        };
        var speak = operators[operatorCode.toUpperCase()] ? operators[operatorCode] : getAbbreviationPhonetics(operatorCode);
        return speak + " ";
      }

      function getAbbreviationPhonetics(word) {
        var seperateChars = word.split("");
        var charSpelling = "";
        var spell = "";
        seperateChars.forEach(function (character) {
          charSpelling = getCharPhonetics(character);
          spell = spell + charSpelling;
        });
        return spell;
      }

      function speak(text, selectedSpeaker, speechSpeed) {
        var msg = new SpeechSynthesisUtterance(text);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[selectedSpeaker];
        msg.volume = 1; // From 0 to 1

        msg.rate = speechSpeed; // From 0.1 to 10

        msg.pitch = 1; // From 0 to 2

        msg.lang = msg.voice.lang;
        window.speechSynthesis.speak(msg);
      } // ---- tts


      function readable2Tts(readableText, selectedSpeaker, speechSpeed) {
        var transcription = "";
        var operator = "";

        var splitAt = function splitAt(index, xs) {
          return [xs.slice(0, index), xs.slice(index)];
        };

        var words = readableText.split(" ");
        words.forEach(function (word) {
          sanitizedWord = word.replace(/[^a-z0-9\u00C0-\u017F\u002D\/]/gi, '');

          switch (true) {
            case /^(\/\/)$/.test(sanitizedWord):
              // Taxi routes 
              transcription += "holding point ";
              break;

            case /^(deicing||de-icing)$/.test(sanitizedWord):
              // Taxi routes 
              transcription += " dee icing ";
              break;

            case /^([1-9]{1}([0]{2}))$/.test(sanitizedWord):
              // hundreds 
              transcription += getAbbreviationPhonetics(sanitizedWord) + " ";
              break;

            case /^([1-9]{1}([0]{3}))$/.test(sanitizedWord):
              // thousands
              transcription += left(sanitizedWord, 1) + getOperatorPhonetics("thousand") + " ";
              break;

            case /^([A-Za-z]{3,10})([0-9]{1}[A-Z]{1})$/.test(sanitizedWord):
              // SID
              var match = sanitizedWord.match(/^([A-Za-z]{3,10})([0-9]{1}[A-Z]{1})$/);
              transcription += match[1] + getAbbreviationPhonetics(match[2]) + " ";
              break;

            case /^(([A-Z]{3})([1-9]{1,5}[0-9]{0,5}[A-Z]{0,1}))|([A-Z]{1}[1-9]{4,5})|([A-Z]{5})$/.test(sanitizedWord):
              // Callsign
              var callsignMatch = sanitizedWord.match(/^(([A-Z]{3})([1-9]{1}[0-9]{0,5}[A-Z]{0,1}))|([A-Z]{1}[1-9]{4,5})|([A-Z]{5})$/);

              switch (true) {
                case typeof callsignMatch[2] !== 'undefined' && typeof callsignMatch[3] !== 'undefined':
                  //ICAO airline telephony designator
                  transcription += getOperatorPhonetics(callsignMatch[2]) + getAbbreviationPhonetics(callsignMatch[3]) + " ";
                  break;

                default:
                  transcription += getAbbreviationPhonetics(sanitizedWord) + " ";
                  break;
              }

              break;

            case /^(([0-9]{2}[CLR]))$/.test(sanitizedWord):
              //runway left,center,right
              var runwayheading = splitAt(2, sanitizedWord)[0];
              var runwayPositionDescription = splitAt(2, sanitizedWord)[1];
              transcription += getAbbreviationPhonetics(runwayheading) + getRunwayPhonetics(runwayPositionDescription);
              break;

            case /^(([A-Z]{0,1}([0-9]{1,4}))|([A-Z0-9]{1})|([0-9]{2,3}))$/.test(sanitizedWord):
              // Parking Positions / Runways etc. to spell
              transcription += getAbbreviationPhonetics(word) + " ";
              break;

            case /^(([0-9]{3}.[0-9]{1,3}))$/.test(sanitizedWord):
              // frequencies
              var frequency = word.split(".")[0];
              var frequencydecimals = word.split(".")[1].replace(/[^a-z0-9\u00C0-\u017F]/gi, '').replace(/^(0|\d*?[1-9])0+$/, '$1');
              transcription += getAbbreviationPhonetics(frequency) + "decimal " + getAbbreviationPhonetics(frequencydecimals);
              break;

            case /^(([FL].[0-9]{2,3}))$/.test(sanitizedWord):
              // Flight Levels (FL__)
              var flightLevelMarker = splitAt(2, sanitizedWord)[0];
              var flightLevel = splitAt(2, sanitizedWord)[1];
              transcription += "flight level " + getAbbreviationPhonetics(flightLevel);
              break;

            case /^([1-9]{1})([0]{1,3})(ft|FT)$/.test(sanitizedWord):
              // Altitude (__ft)              
              var altMatch = sanitizedWord.match(/^([0-9]{1})([0]{1,3})(ft|FT)$/);
              var Altitude = altMatch[2] === "000" ? altMatch[1] + "tausand" : altMatch[1] + altMatch[2]; //transcription += altMatch[1] + getAbbreviationPhonetics(altMatch[2] ) + " ";

              transcription += Altitude + " feet ";
              break;

            case /^(([1-9]{1,4}[0]{1,3}(nm|NM)))$/.test(sanitizedWord):
              // distance (__nm)
              var distance = sanitizedWord.toLowerCase().split("nm")[0];
              transcription += getAbbreviationPhonetics(distance) + " miles ";
              break;

            default:
              transcription += word + " ";
              break;
          }
        });
        transcription = transcription.replace(" , ", ", ").replace("  ", " ").replace(" .", ".");
        console.log(transcription);
        synth.cancel();
        speak(transcription, selectedSpeaker, speechSpeed ? speechSpeed : 1);
        return transcription;
      }

      function getAvailableVoices() {
        voices = window.speechSynthesis.getVoices();
        urlParams.get('debug') == 1 ? alert(voices.length + " voices found") : console.log(voices.length + " voices found");

        if (voices.length > 0) {
          speechSynthesis.getVoices().forEach(function (voice, i) {
            var atcOption = document.createElement("option");
            var acftOption = document.createElement("option");
            atcOption.text = voice.name;
            acftOption.text = voice.name;
            atcOption.value = i;
            acftOption.value = i;
            atcVoiceSelect.add(atcOption, atcVoiceSelect[i]);
            acftVoiceSelect.add(acftOption, acftVoiceSelect[i]);
          });
          atcVoiceSelect.value = atcVoice;
          acftVoiceSelect.value = acftVoice;
        } else {//ttsSettings.innerHTML = "Leider konnten auf deinem System keine Text-to-speech Stimmen gefunden werden. Wenn Du welche verfügbar gemacht hast, kannst Du durch tap/klick auf die Flugfunktexte den Text als Sprachausgabe anhören.<br>Stelle dann bitte auch sicher, dass die Audioausgabe von Websites auch zu hören ist.";
        }
      }

      function addTts() {
        document.querySelectorAll('.atc').forEach(function (transmition) {
          transmition.addEventListener("click", function (event) {
            readable2Tts(event.target.innerText, atcVoice, 1.25);
          });
        });
        document.querySelectorAll('.acft').forEach(function (transmition) {
          transmition.addEventListener("click", function (event) {
            readable2Tts(event.target.innerText, acftVoice, 1.2);
          });
        });
      } // ----- replace callsign


      window.onload = function init() {
        replaceCallsign();
        addTts();
        callsignSelect.addEventListener("keyup", function (event) {
          replaceCallsign();
        });
        getAvailableVoices();

        window.speechSynthesis.onvoiceschanged = function () {
          return getAvailableVoices();
        };

        atcVoiceSelect.addEventListener("change", function () {
          atcVoice = atcVoiceSelect.value;
          localStorage.setItem("atcVoice", atcVoice);
          addTts();
        });
        acftVoiceSelect.addEventListener("change", function () {
          acftVoice = acftVoiceSelect.value;
          localStorage.setItem("acftVoice", acftVoice);
          addTts();
        });
      };

      return _this2;
    }
    /**
     * `connectedCallback()` fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     */


    _createClass(icaoAtcPhraseologyTts, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        document._currentScript = document._currentScript || document.currentScript;
      }
    }]);

    return icaoAtcPhraseologyTts;
  }(_wrapNativeSuper(HTMLElement));

  window.customElements.define('icao-atc-phraseology-tts', icaoAtcPhraseologyTts);
})();