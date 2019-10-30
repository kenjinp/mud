import app from "./App";
import SocketService from "./chatClient";
import { Message, MessageType } from "../model";
import World from "./Render/World";

document.getElementById("content").innerHTML = `
<div id="app">
</div>
`;

app(document.getElementById("app"));

// let user = null;
// let world = null;

// const socketService = new SocketService();
// socketService.initSocket();

// socketService.onMessage(MessageType.HANDSHAKE).subscribe((message: Message) => {
//   const { you, everything } = message.payload;
//   console.log({ you, everything });

//   user = you;

//   const yourCamera =
//     everything.cameras[
//       Object.keys(everything.cameras).find(key => {
//         return everything.cameras[key].userId === you.uuid;
//       })
//     ] || null;
//   world = new World(
//     document.getElementById("world") as HTMLCanvasElement,
//     (yourCamera && yourCamera.position) || [0, 0, 20],
//     {
//       onCameraChange: event => {
//         const {
//           // @ts-ignore
//           target: { object: camera }
//         } = event;
//       }
//     }
//   );
// });

// const loop = () => {
//   requestAnimationFrame(() => {
//     if (world) {
//       world.update(Date.now());
//     }
//     loop();
//   });
// };
// loop();
