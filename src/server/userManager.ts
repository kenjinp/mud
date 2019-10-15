import { User, Camera } from "../model";
import { nameByRace } from "fantasy-name-generator";
import uuidv4 from "uuid/v4";
import { Vector3 } from "three";

export const createUser = (): User => {
  let name;
  try {
    name = nameByRace("human", { allowMultipleNames: true });
  } catch (error) {
    name = "Bad name";
  }
  const user = {
    name,
    uuid: uuidv4()
  };
  return user;
};

export const createCamera = (userId: string): Camera => {
  return {
    userId,
    uuid: uuidv4(),
    position: new Vector3(...randomSpherePoint(0, 0, 0, 20)).toArray(),
    rotation: new Vector3(0, 0, 0).toArray(),
    color: "fff666"
  };
};

function randomSpherePoint(x0, y0, z0, radius) {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
  var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
  var z = z0 + radius * Math.cos(phi);
  return [x, y, z];
}
