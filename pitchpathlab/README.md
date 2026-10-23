# Pitch Path Lab

An interactive side view of a baseball pitch, from release to the front of home plate.

By Ari Shapiro, PhD · ariyshapiro@gmail.com

## What it does

- Draws the ball's path under gravity, alongside a dashed "no-gravity" line, with time marks along the flight.
- Controls for distance to the plate, release height, height over the plate, pitch speed (mph), release extension and batter height.
- Reports the approach angle at the plate, release angle, flight time, gravity drop and speed at the plate.
- Shades the strike zone for the chosen batter height and shows faint paths and angles to the top and bottom of the zone.
- Presets: MLB (60′6″, 90 mph), Little League (45′, 50 mph), plus distance chips including batting practice at 30′ and 20′.
- Front toss matching, comparing a front toss with the game pitch:
  - **Match with front toss**: same flight time *and* approach angle; choose the tosser's posture and the page sets distance and speed.
  - **Match flight time**: same flight time only; options grouped by seated-on-a-bucket, standing and game-pitch release heights across 15–40 ft.
  - **Match approach angle**: same approach angle only.

## Model

Gravity only (g = 32.174 ft/s²); air drag and spin are ignored. For the chosen speed the page solves for the release angle that puts the ball at the target height at the front edge of the plate (17 in in front of the back point), using the flatter of the two possible throws.

Release height is measured from field level at the plate, so it includes the mound. The mound is drawn for distances of 40 ft and beyond; shorter distances are treated as flat ground.

## Running it

Open `index.html` in any web browser. It is a single self-contained file and works offline (headings fall back to a system font without internet).
