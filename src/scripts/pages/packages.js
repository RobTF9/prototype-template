const toggle = document.getElementById('toggleSnapshots');
const snapshots = document.getElementsByClassName('row--indented');

let toggled = false;

toggle.addEventListener('click', () => {
  snapshots.forEach(snapshot => {
    snapshot.classList.toggle('helper-hidden');
  });

  toggled = !toggled;

  if (toggled) {
    toggle.innerHTML = 'Hide snapshots';
  } else {
    toggle.innerHTML = 'Show snapshots';
  }
});
