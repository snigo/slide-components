# slide-components

Slides react component library


## Carousel

Zero-dependencies awesome carousel react component for everyday use. Demo: https://carousel.snigo.dev

### Usage

1. Install the package
```

npm i @snigo.dev/carousel

```

2. Wrap stuff with Carousel component
```js

<main>
  <Carousel
    onApproach={() => { /** Load more images */}}
    onChange={(from, to) => { /** Keep track of the current slide showing */ }}
  >
    {
      images.map((imageId: string) => (
        <Image src={`https://source.unsplash.com/${imageId}/960x600`} width={960} height={600} key={imageId} />
      ))
    }
  </Carousel>
</main>
```

3. Enjoy the ride

![Carousel screenshot](__screenshots__/carousel.png)

### Features

* Supports swiping by both mouse and touch interactions
* No configuration required to start, just wrap any number of components
* Slides can have interactive elements
* Url to particular slide can be passed as `https://myapp.com/#slides3`

### Props

| **Prop name**  | **Type**   | **Default value** | **Description**                                                 |
|----------------|------------|-------------------|-----------------------------------------------------------------|
| `start`        | `number`   | 0                 | Starting index of the slide                                     |
| `loop`         | `boolean`  | false             | Restarts the carousel after the last slide                      |
| `autoplay`     | `number`   | 0                 | Number of seconds to autoshow next slide or `0` to disable      |
| `threshold`    | `number`   | 40                | Number of pixels slided to trigger navigation to the next slide |
| `showDots`     | `boolean`  | true              | Shows dots at the bottom of the carousel                        |
| `showArrows`   | `boolean`  | true              | Shows arrows on both sides of the carousel                      |
| `allowSwipe`   | `boolean`  | true              | Allows swipe either by mouse or touch interaction               |
| `allowDotClick`| `boolean`  | true              | Allows navigation by clicking on the dot                        |
| `onStart`      | `function` |                   | Callback to be called on when carousel renderred on the screen  |
| `onEnd`        | `function` |                   | Callback to be called on the last slide                         |
| `onChange`     | `function` |                   | Callback to be called on every slide change                     |

### Dimensions

Carousel is designed to be contained by parent, meaning it will always take full width and full height of the container. Same applies to the default slide size.