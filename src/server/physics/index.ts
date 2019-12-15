import { World, GSSolver, Material, ContactMaterial } from "cannon";

const physicsWorld = () => {
  const world = new World();
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;

  const solver = new GSSolver();

  world.defaultContactMaterial.contactEquationStiffness = 1e9;
  world.defaultContactMaterial.contactEquationRelaxation = 4;
  solver.iterations = 7;
  solver.tolerance = 0.1;

  world.solver = solver;
  world.gravity.set(0, -9.8, 0);

  // Create a slippery material (friction coefficient = 0.0)
  const physicsMaterial = new CANNON.Material("slipperyMaterial");
  const physicsContactMaterial = new ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    {
      friction: 0.0,
      restitution: 0.3
    }
  );
  // We must add the contact materials to the world
  world.addContactMaterial(physicsContactMaterial);

  return {
    update: (delta: number) => {
      world.step(delta);
    },
    world
  };
};

export default physicsWorld;
