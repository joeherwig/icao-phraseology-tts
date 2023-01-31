(function() {
  /**
   * Cloning contents from a &lt;template&gt; element is more performant
   * than using innerHTML because it avoids addtional HTML parse costs.
   */
  const template = document.createElement('template');
  styles = `
    <style>

      ::slotted(.atc) {
        color: #c25502;
      }
      ::slotted(.atc)::before {
        color: white;
        content: "atc";
        background: #c25502;
        padding: 3px;
        border-radius: 4px;
        margin-right: 1em;
        font-family: Lato;
        font-style: normal;
      }

      ::slotted(.acft) {
        color: #0000cd;
      }
      ::slotted(.acft)::before {
        content: "✈️";
        border: 1px solid rgba(0, 0, 205, 0.4);
        border-radius: 4px;
        padding: 2px;
        margin-right: 1em;
        font-family: Lato;
        font-style: normal;
      }

      ::slotted(div.atc), ::slotted(div.acft) {
        margin: 1em 0 1em 1em;
        font-family: monospace;
        font-size: 1rem;
        user-select: none;
      }

      #ttsSettings > div{
        margin-top: 1em;
      }
      #ttsSettings label{
        display: inline-block;
        width: 150px;
        color: grey;
        font-style: italic;
      }
      #yourCallsign {
        width: 10ch;
      }
    </style>`

    template.innerHTML = styles + `
    <details>
      <summary>⚠️ voices &amp; callsign</summary>
      <div class="ttsInfo" id="ttsSettings">
        <div>
          <label for="acftVoiceSelect">Aircraft voice</label>
          <select id="acftVoiceSelect"></select>
        </div>
        <div>
          <label for="atcVoiceSelect">ATC voice</label>
          <select id="atcVoiceSelect"></select>
        </div>
        <div>
          <label for="yourCallsign">choose your callsign</label>
          <input id="yourCallsign" type="text" value="`+localStorage.getItem("callsign")+`">
          <p>Die Liste realistischer Callsigns findet ihr unter <a href="https://www.avcodes.co.uk/airlcodesearch.asp" target="airlinecodes">https://www.avcodes.co.uk/airlcodesearch.asp</a>
            <div id="errorText"></div>
          </p>
        </div>        
      </div>
    </details>
    <slot>to make use of this TTS element, just add child elements of classes either 'atc' or 'acft' within this tag.</slot></div>`;
  class icaoAtcPhraseologyTts extends HTMLElement {

    /**
     * The element's constructor is run anytime a new instance is created.
     * Instances are created either by parsing HTML, calling
     * document.createElement('icao-atc-phraseology-tts'), or calling new HowToCheckbox();
     * The construtor is a good place to create shadow DOM, though you should
     * avoid touching any attributes or light DOM children as they may not
     * be available yet.
     */
    constructor() {
      super();
      let voices = [];
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      let ttsInfo = this.shadowRoot.querySelector("#ttsInfo");
      let atcVoiceSelect = this.shadowRoot.querySelector("#atcVoiceSelect");
      let acftVoiceSelect = this.shadowRoot.querySelector("#acftVoiceSelect");
      let callsignSelect = this.shadowRoot.querySelector("#yourCallsign");
      let slotElement =document.querySelectorAll('.atc');
      let sanitizedWord ="";
      let currentCallsign = "DLH22G";
      let synth = speechSynthesis,
      isSpeaking = true;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let atcVoice = localStorage.getItem("atcVoice") !== (null && '') ? localStorage.getItem("atcVoice") : 0;
      let acftVoice = localStorage.getItem("acftVoice") !== (null && '') ? localStorage.getItem("acftVoice") : 1;
      let callsign = localStorage.getItem("callsign") !== (null || '') ? localStorage.getItem("callsign") : "DLH22G";
      callsignSelect.value = callsign;

      
      function replaceCallsign () {
        callsign = callsignSelect.value !== (null && '') ? callsignSelect.value : callsign;
        console.log("-----\ncallsign\t"+callsign+"\ncurrentCallsign\t"+currentCallsign);
        if (callsign.match(/^([A-Za-z]{1,3}([A-Za-z0-9]{1,6}))$/)) {
          
          getAllTextNodes().forEach(function(node){
            node.nodeValue = node.nodeValue.replace(new RegExp(quote(currentCallsign), 'g'), callsign.toUpperCase());
          });
          
          function getAllTextNodes(){
            var result = [];
            
            (function scanSubTree(node){
              if(node.childNodes.length) 
              for(var i = 0; i < node.childNodes.length; i++) 
              scanSubTree(node.childNodes[i]);
              else if(node.nodeType == Node.TEXT_NODE) 
              result.push(node);
            })(document);
            return result;
          }
          
          function quote(str){
            return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
          }
          currentCallsign = callsign.toUpperCase();
          localStorage.setItem("callsign", currentCallsign) ;

        } else {
          let errorText = "Dein callsign '"+callsign.toUpperCase()+"' ist noch nicht ICAO konform.<br>Bitte wähle eines das mit drei Buchstaben für die Airline beginnt, und dann 1-4 weitere Buchstaben oder Ziffern hat.<br>Solange verwenden wir im Text weiterhin " + currentCallsign + ".";
        }
      }


      function getCharPhonetics (char) {
        const natoAlphabet = {"A":"alpha", "B":"bravo","C":"charly","D":"delta","E":"echo","F":"foxtrott","G":"golf","H":"hotel","I":"india","J":"juliett","K":"kilo","L":"lima","M":"mike","N":"november","O":"oscar","P":"papa","Q":"quebeck","R":"romeo","S":"sierra","T":"tango","U":"uniform","V":"victor","W":"whiskey","X":"x-ray","Y":"yankee","Z":"zulu","0":"zero","1":"one","2":"two","9":"niner","°":"degrees","3":"trih","4":"four","5":"five","6":"siks","7":"seven","8":"eight"};
        let speak = natoAlphabet[char.toUpperCase()] ? natoAlphabet[char] : char;
        return speak + " ";
      }
      function getRunwayPhonetics (char) {
        const natoAlphabet = {"C":"center","L":"left","R":"right"};
        let speak = natoAlphabet[char.toUpperCase()] ? natoAlphabet[char] : char;
        return speak + " ";
      }

      function getOperatorPhonetics (operatorCode) {
        const operators = {"AAL": "American","AEE": "Aegean","AFR": "Air France","ANA": "All Nippon","AUA": "Austrian","BAW": "Speedbird","BEL": "Beeline","BER": "Air Berlin","CFG": "Condor","CPA": "Cathay","CSN": " China Southern","DAL": "Delta","DLH": "Lufthansa","ETD": "Etihad","EWG": "Eurowings","EZY": "Easy","FSC": "Four Star","GAF": " German Air Force","IBE": "Iberia","ITY": "Itarrow","KLM": "K L M","LXP": "Lanes","MAF": "Missi","NAX": "Nor Shuttle","NJU": "ExecJet","OAL": "Olympic","QFA": "Quantas","QTR": "Qatari","RYR": "Ryanair","SAA": "Springbok","SWA": "Southwest","SWR": "Swiss","TAM": "T A M","TAP": "Air Portugal","THY": "Turkish","UAE": "Emirates","UAL": "United","VLG": "Vueling","VOI": "Volaris","WZZ": "Wizz Air"};
        let speak = operators[operatorCode.toUpperCase()] ? operators[operatorCode] : getAbbreviationPhonetics(operatorCode);
        return speak + " ";
      }

      function getAbbreviationPhonetics(word) {
        let seperateChars = word.split("");
        let charSpelling ="";
        let spell = "";
        seperateChars.forEach(character => {
          charSpelling = getCharPhonetics(character);
          spell = spell + charSpelling;
        })
        return spell;
      }


      function speak(text, selectedSpeaker, speechSpeed) {
        var msg = new SpeechSynthesisUtterance(text);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[selectedSpeaker]; 
        msg.volume = 1; // From 0 to 1
        msg.rate = speechSpeed; // From 0.1 to 10
        msg.pitch = 1; // From 0 to 2
        msg.lang = "en";
        window.speechSynthesis.speak(msg);
      }
      // ---- tts
      function readable2Tts (readableText, selectedSpeaker, speechSpeed) {
        let transcription = "";
        let operator =""
        const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]
        let words = readableText.split(" ");

        words.forEach(word => {
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
              let match = sanitizedWord.match(/^([A-Za-z]{3,10})([0-9]{1}[A-Z]{1})$/)
              transcription += match[1] + getAbbreviationPhonetics(match[2] ) + " ";
              break;
            case /^(([A-Z]{3})([1-9]{1,5}[0-9]{0,5}[A-Z]{0,1}))|([A-Z]{1}[1-9]{4,5})|([A-Z]{5})$/.test(sanitizedWord): 
              // Callsign
              let callsignMatch = sanitizedWord.match(/^(([A-Z]{3})([1-9]{1}[0-9]{0,5}[A-Z]{0,1}))|([A-Z]{1}[1-9]{4,5})|([A-Z]{5})$/)
              switch (true) {
                case (typeof callsignMatch[2] !== 'undefined' && typeof callsignMatch[3] !== 'undefined') : //ICAO airline telephony designator
                  transcription += getOperatorPhonetics(callsignMatch[2]) + getAbbreviationPhonetics(callsignMatch[3]) + " ";  
                  break;
                default:
                  transcription += getAbbreviationPhonetics(sanitizedWord) + " ";  
                  break;
              }
              break;
            case /^(([0-9]{2}[CLR]))$/.test(sanitizedWord): 
              //runway left,center,right
              let runwayheading = splitAt(2, sanitizedWord)[0]
              let runwayPositionDescription = splitAt(2, sanitizedWord)[1]
              transcription += getAbbreviationPhonetics(runwayheading) + getRunwayPhonetics(runwayPositionDescription);
              break;
            case /^(([A-Z]{0,1}([0-9]{1,4}))|([A-Z0-9]{1})|([0-9]{2,3}))$/.test(sanitizedWord): 
              // Parking Positions / Runways etc. to spell
              transcription += getAbbreviationPhonetics(word) + " ";
              break;
            case /^(([0-9]{3}.[0-9]{1,3}))$/.test(sanitizedWord): 
              // frequencies
              let frequency = word.split(".")[0];
              let frequencydecimals = word.split(".")[1].replace(/[^a-z0-9\u00C0-\u017F]/gi, '').replace(/^(\d)|(\d)0+$/gm, '$1$2');
              transcription += getAbbreviationPhonetics(frequency) + "decimal " + getAbbreviationPhonetics(frequencydecimals);
              break;
            case /^(([FL].[0-9]{2,3}))$/.test(sanitizedWord): 
              // Flight Levels (FL__)
              let flightLevelMarker = splitAt(2, sanitizedWord)[0];
              let flightLevel = splitAt(2, sanitizedWord)[1];
              transcription += "flight level " + getAbbreviationPhonetics(flightLevel);
              break;
            case /^([1-9]{1})([0]{1,3})(ft|FT)$/.test(sanitizedWord): 
              // Altitude (__ft)              
              let altMatch = sanitizedWord.match(/^([0-9]{1})([0]{1,3})(ft|FT)$/)
              let Altitude = altMatch[2] === "000" ? altMatch[1] + "tausand" : altMatch[1] +altMatch[2]; 
              //transcription += altMatch[1] + getAbbreviationPhonetics(altMatch[2] ) + " ";
              transcription += Altitude + " feet ";
              break;
            case /^(([1-9]{1,4}[0]{1,3}(nm|NM)))$/.test(sanitizedWord): 
              // distance (__nm)
              let distance = sanitizedWord.toLowerCase().split("nm")[0]
              transcription += getAbbreviationPhonetics(distance) + " miles ";
              break;
            default:
              transcription += (word + " ");
              break;
          }
        });
        transcription = transcription.replace(" , ",", ").replace("  "," ").replace(" .",".");
        console.log(transcription);
        synth.cancel();
        speak(transcription, selectedSpeaker, speechSpeed ? speechSpeed : 1);
        return transcription;
      }

      // ----- replace callsign
      window.onload = function init() {

        function getAvailableVoices () {
          voices = window.speechSynthesis.getVoices();
          speechSynthesis.getVoices().forEach((voice, i) => {
            let option = document.createElement("option");
            option.text  = voice.name;
            option.value = i;
            atcVoiceSelect.add(option, atcVoiceSelect[i]);
          });
          speechSynthesis.getVoices().forEach((voice, i) => {
            let option = document.createElement("option");
            option.text  = voice.name;
            option.value = i;
            acftVoiceSelect.add(option, acftVoiceSelect[i]);
          });

          if (voices.length > 0) {
            acftVoiceSelect.value = acftVoice;
            atcVoiceSelect.value = atcVoice;
          } else {
            ttsInfo.innerHTML = "Leider konnten auf deinem System keine Text-to-speech Stimmen gefunden werden. Wenn Du welche verfügbar gemacht hast, kannst Du durch tap/klick auf die Flugfunktexte den Text als Sprachausgabe anhören.<br>Stelle dann bitte auch sicher, dass die Audioausgabe von Websites auch zu hören ist.";
          }
        }

        function addTts () {
          document.querySelectorAll('.atc').forEach(transmition => {
            transmition.addEventListener("click", (event) => {
              readable2Tts(event.target.innerText, atcVoice, 1.25);
            });
          });
          document.querySelectorAll('.acft').forEach(transmition => {
            transmition.addEventListener("click", (event) => {
              readable2Tts(event.target.innerText, acftVoice, 1.2);
            });
          });
        }
        replaceCallsign();
        addTts();
        callsignSelect.addEventListener("keyup", (event) => {
          replaceCallsign();
        });
        getAvailableVoices();
        window.speechSynthesis.onvoiceschanged = () => getAvailableVoices();
        getAvailableVoices();
        atcVoiceSelect.addEventListener("change", () => {
          atcVoice = atcVoiceSelect.value;
          localStorage.setItem("atcVoice", atcVoice)
          addTts();
        });
        acftVoiceSelect.addEventListener("change", () => {
          acftVoice = acftVoiceSelect.value;
          localStorage.setItem("acftVoice", acftVoice)
          addTts();
        });
      }
    }

    /**
     * `connectedCallback()` fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     */
    connectedCallback() {
      let _this = this;
      document._currentScript = document._currentScript || document.currentScript;
      };
    }

  window.customElements.define('icao-atc-phraseology-tts', icaoAtcPhraseologyTts);
})();
