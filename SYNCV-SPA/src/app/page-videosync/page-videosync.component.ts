import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionLogin, VideoSync } from '../_interfaces/Session';
import * as signalR from "@aspnet/signalr";
import { debug } from 'console';
@Component({
  selector: 'app-page-videosync',
  templateUrl: './page-videosync.component.html',
  styleUrls: ['./page-videosync.component.css']
})

export class PageVideosyncComponent implements OnInit {
  oldSessionId: string = ""
  sessionLogin: SessionLogin = { Id: this.uuidv4() };
  sync: VideoSync = { currentTime: 0.0, paused: true, videoId: "" };
  viewInit: boolean = false;
  videoUrl: string = ""
  connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/synchub?jwttoken=" + localStorage.getItem('token')).build();

  constructor() { }

  player: YT.Player;
  ngAfterViewInit() {
    this.viewInit = true;
  }

  canInit() {
    return this.viewInit && this.sync.videoId != ""
  }

  getVideoId(u: string): string {
    let url = new URL(u);
    console.log("videoId", url.searchParams.get("v"))
    return url.searchParams.get("v");
  }

  getWidth(width) : number {
    if (this.player != undefined) {
      this.player.setSize(width - 70, 600)
    }
    return width
  }
  savePlayer(player) {
    let wasNull =this.player == undefined
    this.player = player;

    if (wasNull) {
      this.player.playVideo()
    }
  }
  onStateChange(event) {
    this.videoSync(null)
  }

  ngOnInit() {
    this.startConnection();
    this.connection.on('ReceiveSync', (sync) => {
      this.receiveMessage(sync);
    });

    this.connection.on('Renotify', () => {
      if (this.player != undefined) {
        this.videoSync(null);
      }
    });

    this.connection.onclose(() => {
      console.log("Disconnected")
      this.reconnect();
    });
  }

  initSession(): void {
    this.joinSession()
    if (this.player == undefined) {
      return
    }
    this.videoSync(null)
  }


  setVideo(): void {

    let sync: VideoSync = {
      currentTime: 0,
      paused: true,
      videoId: this.getVideoId(this.videoUrl)
    }
    this.videoSync(sync)
  }

  reconnect() {
    if (this.connection.state == signalR.HubConnectionState.Connected) {
      return
    }
    let timeElapsed = 5000;

    setTimeout(() => {
      this.startConnection();
    }, 5000);

    let idInterval = setInterval(() => {
      let valueToDisplay = timeElapsed / 1000;
      console.log(`Tentando reconetar em ${valueToDisplay} ${valueToDisplay <= 1 ? 'segundo' : 'segundos'}`)

      timeElapsed -= 1000;

      if (timeElapsed <= 0) {
        clearInterval(idInterval);
      }
    }, 1000);


  }

  startConnection() {
    if (this.connection.state == signalR.HubConnectionState.Connected) {
      return
    }
    this.connection
      .start()
      .then(() => {
        console.log("Conectado")
      this.joinSession()
      })
      .catch(err => {
        setTimeout(() => {
          this.reconnect();
        }, 2000);
      });
  }

  videoSync(sync: VideoSync) {
    if (sync == null) {
      sync = {
        currentTime: this.player.getCurrentTime(),
        paused: this.player.getPlayerState() == YT.PlayerState.PAUSED,
        videoId: this.getVideoId(this.player.getVideoUrl())
      }
    }

    this.connection.invoke("Sync", this.sessionLogin.Id, sync);
  }

  joinSession() {
    this.connection.invoke("JoinSession", this.oldSessionId, this.sessionLogin.Id);
    this.oldSessionId = this.sessionLogin.Id
  }

  receiveMessage(teste: VideoSync) {
    if (teste.videoId != this.sync.videoId) {
      if (this.player != undefined) {
        this.player.loadVideoById(teste.videoId)
      }
        this.sync.videoId = teste.videoId
    }
    this.sync.paused = teste.paused

    if (this.sync.paused) {
      this.player.pauseVideo()
    } else {
      this.player.playVideo()
    }

    if (teste.currentTime > this.sync.currentTime) {
      if ((teste.currentTime - this.sync.currentTime) < 1) {
        return
      }
    } else {
      if ((this.sync.currentTime - teste.currentTime) < 1) {
        return
      }
    }
    this.sync.currentTime = teste.currentTime

    this.player.seekTo(this.sync.currentTime, true)
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}
