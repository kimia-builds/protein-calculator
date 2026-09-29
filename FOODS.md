# Foods: protein figures and what they mean

This is the one place that explains every food button: how many grams of protein one press adds, the exact food and amount that figure is for, the brand, and any assumptions behind it.

If you want to know "what exactly is 'burger'?" or "how was 'hummus' worked out?", look here.

## How to read this

- **Button**: the name on the food button in the calculator.
- **Protein (g)**: grams of protein added by one press. These must match `FOOD_CATEGORIES` in [app.js](app.js), and a test checks that they do.
- **Measurement**: what one press stands for. The colour groups are 1 tbsp (baby pink), 1 unit (mint green), and misc (lilac). See [SPEC.md](SPEC.md) section 4.2.
- **Exact food and amount**: precisely what was weighed or counted (e.g. "1 slice, 28 g").
- **Brand**: the specific product the figure comes from.
- **Assumptions / notes**: anything else: cooked vs raw, how a "unit" was defined, where the number came from, how it was calculated.

Cells marked *to fill in* have not been written down yet.

## Keeping this in sync

When a food is added, removed, or has its protein figure changed, update **both** this file and `FOOD_CATEGORIES` in `app.js` in the same change. `npm test` fails if a food or its grams differ between the two.

Protein figures are per press, to 1 decimal place, matching the calculator.

## Baby pink: 1 tbsp

| Button | Protein (g) | Exact food and amount | Brand | Assumptions / notes |
|---|---|---|---|---|
| yoghurt | 0.6 | 1 tbsp yoghurt *(type to confirm)* | *to fill in* | *to fill in* |
| hemp seed | 3.2 | 1 tbsp hemp seeds | *to fill in* | *to fill in* |
| cashews | 1.6 | 1 tbsp cashews | *to fill in* | *to fill in* |
| almonds | 1.8 | 1 tbsp almonds | *to fill in* | *to fill in* |
| pistachios | 1.0 | 1 tbsp pistachios | *to fill in* | *to fill in* |
| pumpkin seeds | 2.7 | 1 tbsp pumpkin seeds | *to fill in* | *to fill in* |
| hummus | 1.2 | 1 tbsp hummus | *to fill in* | *to fill in* |

## Mint green: 1 unit

"1 unit" means one of whatever the food naturally comes as (a slice, a link, a patty, a tin, and so on). The exact unit for each is spelled out below.

| Button | Protein (g) | Exact food and amount | Brand | Assumptions / notes |
|---|---|---|---|---|
| pastrami | 1.5 | *to fill in (e.g. how many slices)* | *to fill in* | *to fill in* |
| pepperoni | 0.8 | *to fill in (e.g. how many slices)* | *to fill in* | *to fill in* |
| sausage | 5.0 | *to fill in (1 sausage, weight)* | *to fill in* | *to fill in* |
| burger | 12.0 | *to fill in (1 patty, weight)* | *to fill in* | *to fill in* |
| mackerel | 17.0 | *to fill in (1 tin or fillet, weight)* | *to fill in* | *to fill in* |
| sardines | 17.0 | *to fill in (1 tin, weight)* | *to fill in* | *to fill in* |
| egg | 6.3 | *to fill in (1 egg, size)* | *to fill in* | *to fill in* |
| cheese | 5.0 | *to fill in (1 slice or portion, weight)* | *to fill in* | *to fill in* |

## Lilac: misc

Things that are not a tablespoon or a single unit: a serving, a bowl, half a tin, and so on.

| Button | Protein (g) | Exact food and amount | Brand | Assumptions / notes |
|---|---|---|---|---|
| soya latte | 15.0 | *to fill in (cup size, milk brand)* | *to fill in* | *to fill in* |
| half-tin beans | 8.4 | Half a tin of beans *(type and tin size to confirm)* | *to fill in* | *to fill in* |
| jerky pack | 8.0 | 1 pack of jerky *(pack weight to confirm)* | *to fill in* | *to fill in* |
| ryvita slice | 0.9 | 1 slice of Ryvita *(variety to confirm)* | Ryvita *(variety to confirm)* | *to fill in* |
| bowl tagliatelle | 9.0 | 1 bowl tagliatelle *(bowl size, dry or cooked weight)* | *to fill in* | *to fill in* |
| bowl rice | 4.0 | 1 bowl rice *(bowl size, dry or cooked weight)* | *to fill in* | *to fill in* |

## Foods waiting to be added

- Linda sausage (see SPEC.md section 8).
