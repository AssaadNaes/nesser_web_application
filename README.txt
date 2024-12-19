Anleitung zum Starten und Testen der Webseite
Um die Webseite erfolgreich zu starten und zu testen, folgen Sie bitte den untenstehenden Schritten:

1. Voraussetzungen installieren
    Docker Desktop installieren
        - Laden Sie Docker Desktop über diesen Link "https://www.docker.com/get-started/" herunter und installieren Sie es auf Ihrem lokalen Gerät.
        - Starten Sie anschließend die Docker Desktop-Anwendung.
        
    Node Package Manager (npm) installieren
        - Installieren Sie npm, indem Sie diesen Link "https://nodejs.org/en/download/prebuilt-installer" verwenden.
        - Wählen Sie den Prebuilt-Installer-Option und selektieren Sie Ihre Betriebssystem
        - Klicken Sie auf download und installieren Sie es auf Ihrem lokalen Gerät


2. Projekt einrichten
    - Öffnen Sie ein Terminal oder ein CMD-Fenster.
    - Navigieren Sie zu dem Verzeichnis, in dem Sie das Projekt speichern möchten, oder in das bereits bestehende Projektverzeichnis.
    - Klonen Sie das GitHub-Repository mit folgendem Befehl (Falls es noch nicht geklont wurde): git clone <GitHub-Link>


3. Backend und Datenbank starten
    - Wechseln Sie in das Verzeichnis nesser_backend
    - Überprüfen Sie, ob die Dateien docker-compose.yml und Dockerfile vorhanden sind, indem Sie den Befehl ausführen:
    ls -la (Linux)
    dir (Windows)
    - Starten Sie das Backend und die Datenbank mit folgendem Befehl: docker compose up -d
    - Hinweis: Der Prozess kann einige Minuten in Anspruch nehmen.


4. Frontend starten
    - Wechseln Sie in das Verzeichnis nesser_frontend
    - Führen Sie die folgenden Befehle aus:
    npm install
    npm run start


5. Zugriff auf die Webseite
    - Sobald das Frontend gestartet ist, wird ein Link im Terminal angezeigt. Über diesen können Sie die Webseite im Browser öffnen und verwenden.
    WICHTIG: Aus Sicherheitsgründen konnten wir die PayPal-Informationen nicht im Backend auf GitHub hinterlegen.
             Daher wird der Zahlungsprozess über PayPal fehlschlagen, da der aktive PayPal-Schlüssel im Backend nicht vorhanden ist.

6. Beendung der Webseite
    Frontend:
        - Geben Sie im Terminal/CMD "q" ein, um das Frontend zu stoppen

    Backend
        - Wechseln Sie in das Verzeichnis nesser_backend
        - Stoppen Sie das Backend und die Datenbank mit folgendem Befehl: docker compose down
        - Oder über den Docker Desktop app mit dem Stop-Button die Containers Stoppen


