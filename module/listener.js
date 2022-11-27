import { lightIcon } from './enricher.js';
import { createLink } from './button.js';

document.addEventListener('click', async (pointerEvent) => {
	for (let i = 0; i, 2; i++) {
		const el = pointerEvent.path[i];
		if (!el) break;
		if (el.localName === 'a' && el.dataset.broken === 'false') {
			if (el.classList.contains('light-link')) {
				const ids = el.dataset.ids.split(',');
				const light = canvas.lighting.documentCollection.get(ids[0]);
				const hidden = !light.hidden;

				for (const id of ids) {
					const light = canvas.lighting.documentCollection.get(id);
					if (light) await light.update({ hidden });
				}

				//await canvas.lighting.documentCollection.documentClass.updateDocuments(changes);

				const remove = hidden ? lightIcon.on : lightIcon.off;
				const add = hidden ? lightIcon.off : lightIcon.on;

				document.querySelectorAll('a.light-link').forEach((a) => {
					if (a.dataset.ids !== el.dataset.ids) return;
					const i = a.firstChild;
					i.classList.remove(remove);
					i.classList.add(add);
				});

				break;
			} else if (el.classList.contains('scene-link')) {
				const id = el.dataset.id;
				const scene = game.scenes.get(id);
				if (scene && game.user.isGM) scene.activate();
			}
		}
	}
});

document.addEventListener('dragstart', (ev) => {
	for (let i = 0; i, 2; i++) {
		const el = ev.path[i];
		if (!el) break;
		if (el.localName === 'a') {
			if (el.classList.contains('light-link')) {
				const link = createLink(el.dataset.ids, el.dataset.name, 'Light');
				ev.dataTransfer.setData('text/plain', link);
				break;
			} else if (el.classList.contains('scene-link')) {
				const link = createLink(el.dataset.id, el.dataset.name, 'Activate');
				ev.dataTransfer.setData('text/plain', link);
				break;
			}
		}
	}
});
