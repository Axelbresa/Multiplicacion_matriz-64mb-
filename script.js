// Variable para almacenar el tamaño total en MB
let totalSizeAccumulatedMB = 0;
let sizeDisplay = document.getElementById('sizeDisplay'); // Elemento HTML donde se mostrará el tamaño acumulado

// Función para actualizar el valor del tamaño acumulado en el elemento HTML
function updateSizeDisplay(sizeInMB) {
  sizeDisplay.textContent = 'Tamaño acumulado en MB: ' + sizeInMB.toFixed(2);
}

// Función para calcular el tamaño en MB de un tensor
function calculateSizeInMB(tensor) {
  const sizeInBytes = tensor.size * 4; // Cada elemento es de 4 bytes (int32)
  const sizeInMB = sizeInBytes / (1024 * 1024);
  // Acumular el tamaño en MB
  totalSizeAccumulatedMB += sizeInMB;
  return sizeInMB;
}

async function multiplyTensorsUntilSizeLimit() {
  const sizeLimitMB = 1; // Nuevo límite de tamaño del tensor en MB
  let tensorA = tf.randomUniform([10, 10], 1, 10, 'int32'); // Tensor A con valores del 1 al 9
  let tensorB = tf.randomUniform([10, 10], 1, 10, 'int32'); // Tensor B con valores del 1 al 9

  // Multiplicar tensorA y tensorB para obtener un resultado inicial
  let resultTensor = tf.matMul(tensorA, tensorB);
  console.log(await resultTensor.array());
  let totalSizeMB = calculateSizeInMB(resultTensor); // Calcula el tamaño inicial en MB
  updateSizeDisplay(totalSizeAccumulatedMB); // Mostrar tamaño acumulado en el elemento HTML
console.log(totalSizeMB)
  // Iterar multiplicando resultTensor con tensorA hasta alcanzar el límite de tamaño
  while (totalSizeMB < sizeLimitMB) {
    resultTensor = tf.matMul(resultTensor, tensorA);
    totalSizeMB = calculateSizeInMB(resultTensor); // Calcula el nuevo tamaño en MB
    updateSizeDisplay(totalSizeAccumulatedMB); // Mostrar tamaño acumulado en el elemento HTML

    // Verificar si se ha superado el límite
    if (totalSizeAccumulatedMB > sizeLimitMB) {
      console.log(`¡Ya has llegado a ${totalSizeAccumulatedMB.toFixed(2)} MB!`);
      alert(`¡Ya has llegado a ${totalSizeAccumulatedMB.toFixed(2)} MB!`);
      break; // Salir del bucle
    }

    await tf.nextFrame(); // Permitir que el navegador actualice la interfaz durante el bucle
  }

  console.log('Resultado final:');
  console.log(await resultTensor.array());

  // Liberar memoria
  tensorA.dispose();
  tensorB.dispose();
  resultTensor.dispose();
}

// Llamar a la función principal al cargar la página
multiplyTensorsUntilSizeLimit();