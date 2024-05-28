# Major-Project_individual-Task
# Wheels of Fortune Interactive Art Project

## Overview
This project creates an interactive animation that abstractly recreates the "Wheels of Fortune" artwork. The animation responds to mouse movements and keyboard interactions. Circles are arranged diagonally, above, and below the diagonal. When the mouse hovers over them or a keyboard interaction occurs, they explode into fireworks. Lines extending from the center of the circles follow the mouse movements.

## Instructions

### Mouse Interaction
1. Move the mouse slowly over the screen. When the cursor hovers over a circle, it will explode into a firework effect.
2. As the mouse moves within the canvas, the ends of the lines extending from the circle centers will follow the mouse movements.

### Keyboard Interaction
1. Press the spacebar to trigger all circles to explode simultaneously like fireworks.
2. Press the spacebar again to revert the circles to their original state.

## Individual Approach to Animating the Group Code

### Chosen Driver: User Input (Interaction)
I chose to drive my individual code primarily through user input (interaction), specifically mouse movements and keyboard presses. This makes the animation highly interactive and responsive to user actions.

### Animated Properties
1. **Explosion Effect**: When the mouse hovers over a circle, it explodes into fireworks.
2. **Firework Particles**: The `lerp` function is used to animate the particles' positions, creating a smooth transition from the center to the outer edges.
3. **Extending Lines**: Lines extending from the circle centers follow the mouse cursor.

### Uniqueness
My animation is unique in the following ways:
1. **Interactive Explosions**: The primary interaction is driven by mouse movements and spacebar presses, making the animation highly engaging.
2. **Visual Effects**: Each circle can display multiple visual effects and changes of color, including concentric circles, surrounding ellipses, filled circles, and zigzag lines.
3. **Dynamic Lines**: Extension lines from each circle center to the mouse cursor create a dynamic visual effect.

## References to Inspiration

### Inspiration
1. **Fireworks**: My inspiration comes from the visual effects of fireworks. The smooth transitions and explosion effects are directly influenced by real-world fireworks and artistic representations of fireworks.

![Firework Art](Group%20Assignment/assets/Firework%20Art.jpg)
![Firework](Group%20Assignment/assets/Firework.jpg)
![Firework](Group%20Assignment/assets/Firework.PNG)
   
2. **Mouse Interaction Follow**: The idea of interactive elements following the mouse cursor inspired the dynamic extension lines in this project.

![Eyes](Group%20Assignment/assets/Eyes.jpg)

## Technical Explanation

### How the Code Works
1. **Circle Initialization**: Circles are initialized with positions, sizes, and explosion states.
2. **Mouse Detection**: The `dist` function calculates the distance between the mouse cursor and each circle to determine if the circle should explode.
3. **Animation Loop**: The `draw` function continuously checks for interactions and updates the circles' states. If a circle is in an exploded state, the firework effect is drawn.
4. **Firework Effect**: The `drawFirework` function uses the `lerp` function to animate particles from the circle center to the outer edges.
5. **Extending Lines**: The `drawExtendingLine` function calculates the angle from the circle center to the mouse cursor and draws a line following the cursor.

### Changes to Group Code
I made significant changes to the group code to incorporate interactive elements. These changes include:
1. **Explosion Logic**: Added logic to handle mouse hover and spacebar interactions.
2. **Dynamic Drawing**: Enhanced the drawing functions to include firework effects and dynamic lines.

### External Tools and Techniques
- **`lerp` Function**: This function returns an intermediate value between two numbers based on a given weight, used to control the positions of particles in the firework effect, creating smooth transitions.
- **`atan2` Function**: A mathematical function used to calculate the angle from the origin (0,0) to a point (x, y). In my code, it calculates the angle for drawing dynamic lines from the circle center to the mouse cursor.
- **`vertex` Function**: Used to define the vertices of shapes. In my code, it defines the starting point of the extending lines.
- **`quadraticVertex` Function**: Used to draw quadratic Bézier curves, defined by a start point, a control point, and an end point. It creates a smooth curve from the circle center to the extending line's end.

## Conclusion
This project combines interactive elements with dynamic animations to create a visually engaging and responsive artwork. By leveraging user interactions and P5.js capabilities, the animation provides a unique and immersive experience.
