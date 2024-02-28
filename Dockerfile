FROM openjdk:18-jdk

# Actualizar URL de Android Studio según la versión deseada
RUN apt-get update && apt-get install -y wget unzip
RUN wget https://dl.google.com/android/studio/binaries/studio-4.2.1-linux.tar.gz
RUN tar -xzf studio-4.2.1-linux.tar.gz -C /opt/android-studio

ENV ANDROID_HOME /opt/android-studio
RUN echo 'export PATH=$ANDROID_HOME/bin:$PATH' >> ~/.bashrc

# Inicializar proyecto Android
RUN gradle init --build-script build.gradle

WORKDIR /app

# Copiar código fuente al contenedor
COPY . .

# Construir aplicación
RUN ./gradlew assembleDebug

# Instalar dependencias adicionales (si las hay)
# ...

# Instalar Firebase CLI
RUN npm install -g firebase-tools

# Configurar Firebase (si se usa)
ENV FIREBASE_CONFIG_FILE /app/firebase-config.json
RUN firebase init

# Crear base de datos Firebase (opcional)
# ...

# Iniciar servidor web (opcional)
# ...

CMD ["java", "-jar", "app.jar"]
