# Global Animal Slaughter Counter

A real-time visualization displaying the estimated number of animals killed for food globally, calculated from the moment the webpage is opened. Based on 2013 FAOSTAT and fishcount.org.uk statistics, the counter provides a striking perspective on global animal agriculture.

## Overview

This project displays live-updating slaughter counts for various animal types, including:
- Fish (wild-caught and farmed)
- Poultry (chickens, ducks, turkeys, geese)
- Livestock (cattle, pigs, sheep, goats, buffalo)
- Other animals (horses, donkeys, camels, rabbits, rodents, pigeons and other birds)

The counts are updated approximately 20 times per second using publicly available global slaughter data.

## Usage

Simply open `index.html` in any modern web browser. The counter will immediately begin updating, showing the estimated number of each animal type killed for food since the page loaded.

## Data Sources

- **FAOSTAT**: [FAO Animal Production Statistics](http://faostat3.fao.org/download/Q/QL/E) — Global livestock slaughter data
- **Fish Count**: [Fish Count Estimates](http://fishcount.org.uk/fish-count-estimates) — Fish catch and farm slaughter estimates

**Note**: Data is based on 2013 statistics. Actual current numbers may differ.

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Responsive design for desktop and mobile
- Self-correcting timer for accurate counting over time
- Smooth animations and visual feedback

## Disclaimer

This counter is provided for educational and awareness purposes to illustrate the scale of global animal agriculture. Actual numbers and calculations are approximations based on available global statistics.