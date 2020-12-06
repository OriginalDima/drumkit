const recBtn = document.querySelector('#rec-btn');
interface ChennelSound {
    id: string;
    time: number;
}
interface KeyToaudio {
    [id: string]: string
}
export class App {
    channel: ChennelSound[] = [];

    recStartTime: number;
    isRecording = false;

    constructor() {
        this.start();
        this.clickOnKeyDown();
    }
    start() {
        document.addEventListener('keydown', (e) => {
            this.onKeyDown(e)
        });
        recBtn.addEventListener('click', () => { // e: MouseEvent
            this.recChannel() //e
        });
        document.querySelector('#play-btn').addEventListener('click', () => {
            this.playChannel()
        });
    }
    recChannel(): void { // e: MouseEvent
        console.log('click');
        this.isRecording = true;
        recBtn.classList.add('buttons__controllers_red');
        this.recStartTime = Date.now();
    }
    playChannel(): void {
        console.log('click');
        this.isRecording = false;
        recBtn.classList.remove('buttons__controllers_red');
        this.channel.forEach(sound => {
            setTimeout(() => {
                    this.playAudio(sound.id);
                },
                sound.time
            );
            this.channel = [];
            console.log(this.channel);
        });
    }
    onKeyDown(e: KeyboardEvent) {
        console.log(e);
        const key = e.key;
        console.log(`${key}: key`);

        // const time = e.timeStamp - this.recStartTime;

        const keysToAudioId: KeyToaudio = {
            a: 'boom-audio',
            s: 'clap-audio',
            d: 'hihat-audio',
            f: 'kick-audio',
            g: 'openhat-audio',
            h: 'ride-audio',
            j: 'snare-audio',
            k: 'tom-audio',
        }

        const audioId = keysToAudioId[key];
        console.log(`${audioId}: audioId`);

        if (audioId) {
            this.playAudio(audioId);
            this.recordSound(audioId);
        }
    }
    clickOnKeyDown() {
        const sounds: NodeList = document.querySelectorAll('.sounds__items');
        for (const items of sounds) {
            console.log('clickOnKeyDown');
            items.addEventListener('click', (e) => {
                const audio = (e.target as HTMLElement).lastElementChild as HTMLAudioElement;
                audio.currentTime = 0;
                audio.play();
                const id = audio.dataset.id;
                // const time = e.timeStamp - this.recStartTime;
                this.recordSound(id);
            });
        }
    }
    playAudio(id: string) {
        const sounds: HTMLAudioElement = document.querySelector('#' + id);
        console.log(sounds);
        sounds.currentTime = 0;
        sounds.play();
    }
    recordSound(id: string) {
        const time = Date.now() - this.recStartTime;
        if (this.isRecording) {
            const sound: ChennelSound = {
                id,
                time
            };
            this.channel.push(sound);
            console.log(this.channel);
        }
    }
}