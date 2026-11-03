# Foods: protein figures and what they mean

This documents every food button, taken from [protein-sheet.xlsx](protein-sheet.xlsx), which is the source sheet the buttons are built from.

## How to read this

- **Button**: the name on the food button in the calculator (the "calculator button" column of the sheet).
- **Protein (g)**: grams of protein added by one press. This is the sheet's per unit, per serving or per other amount, never the per 100g figure. These must match `FOOD_CATEGORIES` in [app.js](app.js), and a test checks that they do.
- **Food**: the simple name of the food in the sheet.
- **Brand / type**: the specific product the figure comes from.
- **Per 100g**: reference only. It is never used for a button.
- **Notes**: what one press stands for (from the sheet's per unit / per other column) plus the sheet's own notes.

The colour groups, in order, are blue (1 serving), mint (1 unit), pink (1 tbsp) and lilac (misc). See [SPEC.md](SPEC.md) section 4.2.

## Keeping this in sync

When the sheet changes, update **both** this file and `FOOD_CATEGORIES` in `app.js` in the same change. `npm test` fails if a food or its grams differ between this file and the buttons (same names, same order).

Protein figures are per press, to 1 decimal place, matching the calculator.

## Blue: 1 serving

| Button | Protein (g) | Food | Brand / type | Per 100g (reference only) | Notes |
|---|---|---|---|---|---|
| rice | 5.0 | rice | basmati white | 3.5 | 5g per portion; cooked |
| macaroni | 21.0 | macaroni | rummo high protein 21 maxima | 21.0 | 21g per portion; cooked |
| noodles | 6.0 | noodles | maggi curry flavour instant | 2.0 | 6g per portion; cooked |
| tagliatelle | 8.8 | tagliatelle | morrisons | 4.9 | 8.8g per portion; cooked |
| vivera mince | 11.6 | vegan mince | vivera plant based mince | 21.0 | 11.6g per portion; 220g per packet, we usually split into 4 portions |
| sardines | 22.0 | sardine | fish4ever in tomato sauce | 19.0 | 22g per tin; we're counting a tin as a serving |
| baked beans | 8.5 | baked beans | ocado tin | 4.0 | 8.5g per serving; 2 servings per tin |
| kidney beans | 6.6 | kidney beans | ocado tin | 8.3 | 6.6 per serving; 3 servings per tin |
| cannellini | 3.4 | cannellini beans | ocado tin | 4.3 | 3.4g per serving; 3 servings per tin |
| biltong | 13.0 | jerkey | ember biltong | 51.8 | 13g per pack |
| caramel ball | 10.0 | protein balls | protein ball co salted caramel | 22.2 | 10g per packet |

## Mint green: 1 unit

| Button | Protein (g) | Food | Brand / type | Per 100g (reference only) | Notes |
|---|---|---|---|---|---|
| knäcke | 1.3 | knäckebröd | wasa husman | 10.0 | 1.3g per unit |
| egg | 6.3 | egg | - | 13.0 | 6.3g per unit; cooked |
| lnd sausage | 7.0 | sausage | linda mccartney red onion + rosemary | 17.0 | 7.0g per unit |
| rm burger | 20.0 | burger | richmond quarter pounder | 18.0 | 20.0g per unit |
| rm sausage | 3.3 | sausage | richmond | 8.7 | 3.3g per unit |
| lnd burger | 23.8 | burger | linda mccartney quarter pounder | 21.0 | 23.8g per unit |
| pastrami | 3.0 | pastrami | squeaky bean NYC deli | 30.0 | 3.0g per unit |

## Pink: 1 tbsp

| Button | Protein (g) | Food | Brand / type | Per 100g (reference only) | Notes |
|---|---|---|---|---|---|
| pkn seeds | 2.4 | pumpkin seeds | - | 30.0 | 2.4 per spoonful; 8g per spoonful |
| hemp seeds | 3.2 | hemp seeds | biona organic | 25.0 | 3.2g per spoonful; 10g per spoonful |
| pro-wder | 6.0 | protein powder | green origins organic blend | 74.0 | 6g per spoonful; 12g per 16g powder or 2 spoonfuls |
| yoghurt | 1.0 | yoghurt | alpro no sugars plain | 4.0 | 1g per spoonful |
| spoon pb | 8.4 | peanut butter | - | 27.0 | 8.4g per spoonful |

## Lilac: misc

| Button | Protein (g) | Food | Brand / type | Per 100g (reference only) | Notes |
|---|---|---|---|---|---|
| brown thins | 4.0 | bread | wharburtons brown slice | 9.9 | 4.0g per unit; 2g per lil half slice |
| 4 pepperoni | 1.8 | pepperoni | quorn | 11.0 | 1.8g per 4 slices; there are 24 slices per pack, each pack is 100g |
| 25g cheddar | 6.0 | cheese | belton farm organic mature cheddar | 23.9 | 6g per 25g cheese |
| smoothie | 42.5 | berry smoothie | home-made peanut butter berry | - | 42.5g per smoothie |
| edamame | 13.0 | edamame beans | ocado frozen | 13.0 | 13g per 100g edamame |
| soya latte | 8.1 | soya milk | from a coffee shop like pret | 3.0 | 8.1 per cup of coffee |
| soya tea | 2.5 | soya milk | alpro high protein | 3.3 | 2.5g per cup of tea |

## Left out of the buttons

These rows are pink in the sheet, so they have no button:

- chashews
- pistachios
- peanuts
- hummus
- kokosboll
- oats
