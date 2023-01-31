# icao-phraseology-tts
is a self contained webcomponent to "speak" aeronautical radio transmissions on a web page.

I used it to build an easy to write ICAO phraseology training page.

## Example

## Useage
### design time
Include it by simply [downloading](https://raw.githubusercontent.com/joeherwig/icao-phraseology-tts/main/icao-atc-phraseology-tts.js) and adding the js file in your website like

      <!DOCTYPE html>
      <html>
        <head>
         ...
          <script type="text/javascript" src="icao-phraseology-tts.js"></script>
          ...
in your webpage..

Then use it where you want to add your ICAO content like that:


        ...
        <body>
          ...
          <icao-atc-phraseology-tts>
            ...
            <div class="acft">Stuttgart Delivery, DLH22G, Position 12, Information K, request Startup and clearance to Zürich.</div>
            <div class="atc">DLH22G, good morning, say again your Position.</div>
            ...
            <div class="acft">DLH22G, we're on Position 12.</div>
            <div class="atc">DLH22G, cleared to Munich via Rotweil 5B Departure. Climb Altitude 5000ft.</div>
          </icao-atc-phraseology-tts>
            ...
          
Of course you can also structure your aeronautical radio documentation with headlines, paragraphs, lists, figures and images etc.

I just work with nested divs which have css classes `atc` or `acft` assigned.

### Spelling hints
#### Callsigns
For a couple of airlines we're able to map the callsign to the telephony designator.
As ICAO only offers an paid API I decided to include a list of ICAO Airline designators and mapped them to telephony designators.

#### Airline codes 
currently translated to the ICAO telephony designator:
"AAL": "American"
"AEE": "Aegean"
"AFR": "Air France"
"ANA": "All Nippon"
"AUA": "Austrian"
"BAW": "Speedbird"
"BEL": "Beeline"
"BER": "Air Berlin"
"CFG": "Condor"
"CPA": "Cathay"
"CSN": "China Southern"
"DAL": "Delta"
"DLH": "Lufthansa"
"ETD": "Etihad"
"EWG": "Eurowings"
"EZY": "Easy"
"FSC": "Four Star"
"GAF": "German Air Force"
"IBE": "Iberia"
"ITY": "Itarrow"
"KLM": "K L M"
"LXP": "Lanes"
"MAF": "Missi"
"NAX": "Nor Shuttle"
"NJU": "ExecJet"
"OAL": "Olympic"
"QFA": "Quantas"
"QTR": "Qatari"
"RYR": "Ryanair"
"SAA": "Springbok"
"SWA": "Southwest"
"SWR": "Swiss"
"TAM": "T A M"
"TAP": "Air Portugal"
"THY": "Turkish"
"UAE": "Emirates"
"UAL": "United"
"VLG": "Vueling"
"VOI": "Volaris"
"WZZ": "Wizz Air"

#### Altitudes
should be noted in the form of `5000ft`.

#### Flight levels
should be noted in the form of `FL320`.

#### SIDs / STARs
Sometimes it's hard to recognize the correct spelling. Especially for SIDs, STARs etc. it aint easy to refer to the right pattern what to spell and what to just read. 
Probably you might need to add blanks inbetween or switch for reading to lower case letters, while for spelling to upper case letters.

#### Frequencies
should be noted in the form of `xxx.xxx`.
for instance as `128.456`
If the trailing digits after the decimal seperator - which must be a `.` are just `0`, they are omitted.
For instance `118.500` reads as `one eight zero decimal five`

#### distances
can either be transcribed as `20nm` and are then translated to `two zero miles` or can be just written how you want to hear them.

#### special pronunciations
| value | icao compliant | normally spoken |
|--|--|--|
|0 | **zero** | instead of the american 'oh'|
|3 | **tri** | instead of 'three'|
|9 | **niner** | instead of 'nine'|
|1000 | **tau sand** | instead of 'thousand'|
|[0-9]{2}[LCR] | 07L<br>23C<br>16R | is read as runway 'zero seven left'<br>is read as runway 'two tri center'<br>is read as runway 'one six right'<br>|

### runtime
While reading your page where you implemented the custom element, you can just click or tap onto the formatted aeronautical radio transmition paragraphs to let your system read the text of this paragraph.
While reading clicking on the next transmition will stop the running one and switch to the next one.

## Configuration
At the top of the custom element there is a collapsed block that offers you to select the voices for ATC and Aircraft and set your own callsign.

### Setting the callsign
To provide the ability to let the reader choose the own callsign, I added an ability to replace the callsign of Lufthansa two two golf (DLH22G) if you enter an other callsign within the related field in the collapsable "voices & callsign" block.




## License
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)