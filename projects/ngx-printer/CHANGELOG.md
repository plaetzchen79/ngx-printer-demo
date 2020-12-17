# 0.9.1
- fixes #21, #22

# 0.9.0
- updated to Angular 11

# 0.8.2
- optimizations for #15 / #18

# 0.8.1
- fix #14
- optional context parameter for 'printAngular'
- security updates

# 0.8.0
- updated to Angular 10

# 0.7.0
- new function 'printPrintItems' to print
more than one print item one beneatch each other
- copy existing css when printing to new tab/page

# 0.6.2
- new property 'printPreviewOnly' for the main service

# 0.6.1
- npm package changes

# 0.6.0
- lots of new properties for diectvie 'ngxPrintItemButton'

# 0.5.3
- extends config with property 'markerPosition' and the proper enum 'ngxPrintMarkerPosition'
- public demo page

# 0.5.2
- extends config with property appRootName

# 0.5.1
- function directPrint for PrinterMarker directive 
- improved printing to same window when window is scrolled
- improved demo app

# 0.5.0
- new directives to make life easier:
    - added new directive ngxPrintItemButton
    - added new directive ngxPrintItemMarker
- updated to Angular 9.1

# 0.4.0
- upgraded to Angular 9

# 0.3.2
- set internal object to null after print

# 0.3.1
- bugfix: addtional exist-check before removing print element from dom

# 0.3.0
- now uses 'afterprint' event to dectect closing print window (will not work on safari)

# 0.2.0
- upgraded to Angular 8
- improved docu

# 0.1.8
- bugfix: content to be print gets deleted from dom afer printing div to new window 
- internal optimizations

# 0.1.7
- no more loading spinner when printing in new window

# 0.1.6
- improved image loading when printing images

# 0.1.5
- added function to print images via src directly

# 0.1.4
- bugfix: content to be print gets deleted from dom afer printing in current window 
- internal optimizations

# 0.1.3
- added option for custom css class when printing to current window
- updated documentation

# 0.1.2
- bug fixes when printing to current window

# 0.1.1
- added new directive ngxPrintItem to mark and store items to be printed in HTML