// Use installed dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls.js';
import { FontLoader } from 'three-stdlib/loaders/FontLoader.js';
import { TextGeometry } from 'three-stdlib/geometries/TextGeometry.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.set(-15, 10, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 5, 10);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(80, 60);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Materials
const columnMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

// Adjusted sizes
const wallHeight = 3.2; // Chiều cao tường 3.2 mét
const columnHeight = 3.2; // Chiều cao cột 3.2 mét
const boardWidth = 2.4; // Tấm bảng rộng 240cm
const boardHeight = 1.8; // Tấm bảng cao 180cm

// Tường giữa (nối hai cột)
const centerWall = new THREE.Mesh(new THREE.BoxGeometry(11, wallHeight, 0.2), columnMaterial);
centerWall.position.set(0, wallHeight / 2, -2.5);
scene.add(centerWall);

// Cột hình chữ nhật bên trái
const leftRectColumn = new THREE.Mesh(new THREE.BoxGeometry(0.75, columnHeight, 0.6), columnMaterial);
leftRectColumn.position.set(-5.5, columnHeight / 2, -2.5);
scene.add(leftRectColumn);

// Cột hình chữ nhật bên phải
const rightRectColumn = new THREE.Mesh(new THREE.BoxGeometry(0.75, columnHeight, 0.6), columnMaterial);
rightRectColumn.position.set(5.5, columnHeight / 2, -2.5);
scene.add(rightRectColumn);

// Cột hình tròn bên trái
const leftColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, columnHeight, 32), columnMaterial);
leftColumn.position.set(-5.5, columnHeight / 2, 1);
scene.add(leftColumn);

// Cột hình tròn bên phải
const rightColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, columnHeight, 32), columnMaterial);
rightColumn.position.set(5.5, columnHeight / 2, 1);
scene.add(rightColumn);

// Bảng
const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEFA });
const board = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, boardHeight, 0.1), boardMaterial);
board.position.set(-2, 1.7, -2.4);
scene.add(board);

// Bức tường mới sát cột chữ nhật phải
const rightWall = new THREE.Mesh(new THREE.BoxGeometry(11, wallHeight, 0.2), columnMaterial);
rightWall.position.set(11, wallHeight / 2, -2.5);
scene.add(rightWall);

// Cột hình chữ nhật bên phải (sát tường mới)
const newRightRectColumn = new THREE.Mesh(new THREE.BoxGeometry(0.75, columnHeight, 0.6), columnMaterial);
newRightRectColumn.position.set(16.5, columnHeight / 2, -2.5);
scene.add(newRightRectColumn);

// Cột hình tròn bên phải (sát tường mới)
const newRightColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, columnHeight, 32), columnMaterial);
newRightColumn.position.set(16.5, columnHeight / 2, 1);
scene.add(newRightColumn);

// Bàn
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Màu gỗ
const tableGeometry = new THREE.BoxGeometry(2.0, 0.3 , 0.6); // Chiều dài, cao, rộng
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.set(2, 0.75, -1.9);
scene.add(table);

// Chân bàn (4 chân hình cột)
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.75, 32); // Hình trụ: đường kính 0.05, cao 0.75
const cylinderLegs = [
    new THREE.Mesh(legGeometry, legMaterial), // Chân 1
    new THREE.Mesh(legGeometry, legMaterial), // Chân 2
    new THREE.Mesh(legGeometry, legMaterial), // Chân 3
    new THREE.Mesh(legGeometry, legMaterial)  // Chân 4
];

// Tính toán vị trí các chân dựa trên vị trí mới của mặt bàn
const tableLength = 2.0; // Chiều dài mặt bàn
const tableWidth = 0.6;  // Chiều rộng mặt bàn
const offsetX = tableLength / 2 - 0.1; // Vị trí chân dọc trục X (từ mép vào trong)
const offsetZ = tableWidth / 2 - 0.1;  // Vị trí chân dọc trục Z (từ mép vào trong)
const tableY = 0.75 / 2;               // Độ cao của chân tính từ giữa mặt bàn

// Đặt vị trí mới cho từng chân
cylinderLegs[0].position.set(2 - offsetX, tableY, -1.9 + offsetZ);  // Chân 1: góc trên trái
cylinderLegs[1].position.set(2 - offsetX, tableY, -1.9 - offsetZ);  // Chân 2: góc dưới trái
cylinderLegs[2].position.set(2 + offsetX, tableY, -1.9 + offsetZ);  // Chân 3: góc trên phải
cylinderLegs[3].position.set(2 + offsetX, tableY, -1.9 - offsetZ);  // Chân 4: góc dưới phải
// Thêm các chân bàn vào scene
cylinderLegs.forEach((leg) => scene.add(leg));

// Cánh cửa và khung cửa
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const doorGeometry = new THREE.BoxGeometry(1.2, 2.2, 0.05);
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(10.0, 1.1, -2.4);
scene.add(door);

const doorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const doorFrameGeometry = new THREE.BoxGeometry(1.3, 2.4, 0.05);
const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
doorFrame.position.set(10.0, 1.2, -2.4);
scene.add(doorFrame);

// Bảng màu đen (Bảng 2) với khung treo chữ L
const blackBoardMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Màu đen
const blackBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 1.8, 1.8), // Kích thước bảng: 1.8 x 1.8
    blackBoardMaterial
);

// Vị trí đặt bảng:
// Đặt ở giữa cột chữ nhật và cột tròn, bên dưới thanh ngang
blackBoard.position.set(16.0, 1.9, -1.0); 
scene.add(blackBoard);

// Khung treo chữ L (Bảng 2)
const boardFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Màu xám

// Cột đứng bên phải của khung chữ L
const verticalPoleRight = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 3.0, 0.1), // Cột đứng: cao 3m, tiết diện vuông 0.1
  boardFrameMaterial
);
verticalPoleRight.position.set(16.0, 1.5, -1.85); // Đặt sát phía sau bảng đen (bên phải)
scene.add(verticalPoleRight);

// Cột đứng bên trái của khung chữ L
const verticalPoleLeft = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 3.0, 0.1), // Cột đứng: cao 3m, tiết diện vuông 0.1
  boardFrameMaterial
);
verticalPoleLeft.position.set(16.0, 1.5, -0.15); // Đặt sát phía sau bảng đen (bên trái)
scene.add(verticalPoleLeft);

// Thanh ngang gắn trên đỉnh cột đứng
const horizontalPole = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 1.8), // Thanh ngang: dài 1.8m, tiết diện vuông 0.1
    boardFrameMaterial
);
horizontalPole.position.set(16.0, 3.0, -1.0); // Đặt trên đỉnh cột đứng, giữ nguyên thông số
scene.add(horizontalPole);

// Gắn bảng đen (Bảng 2) vào thanh ngang
blackBoard.position.y = 2.1; // Điều chỉnh bảng đen để gắn ngay bên dưới thanh ngang

// Bàn mới (bàn 2) - Cùng hướng với bảng 2
const newTable = new THREE.Mesh(tableGeometry, tableMaterial);
newTable.position.set(15, 0.75, 0); // Vị trí gần bảng 2
newTable.rotation.y = Math.PI / 2; // Xoay bàn 90 độ quanh trục Y
scene.add(newTable);

// Chân bàn mới (4 chân hình cột)
const newCylinderLegs = [
    new THREE.Mesh(legGeometry, legMaterial), // Chân 1
    new THREE.Mesh(legGeometry, legMaterial), // Chân 2
    new THREE.Mesh(legGeometry, legMaterial), // Chân 3
    new THREE.Mesh(legGeometry, legMaterial)  // Chân 4
];

// Vị trí các chân của bàn mới
newCylinderLegs[0].position.set(15 - offsetZ, tableY, 0 - offsetX);  // Chân 1: góc trên trái
newCylinderLegs[1].position.set(15 + offsetZ, tableY, 0 - offsetX);  // Chân 2: góc dưới trái
newCylinderLegs[2].position.set(15 - offsetZ, tableY, 0 + offsetX);  // Chân 3: góc trên phải
newCylinderLegs[3].position.set(15 + offsetZ, tableY, 0 + offsetX);  // Chân 4: góc dưới phải

// Thêm các chân bàn mới vào scene
newCylinderLegs.forEach((leg) => scene.add(leg));

// Render loop
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();