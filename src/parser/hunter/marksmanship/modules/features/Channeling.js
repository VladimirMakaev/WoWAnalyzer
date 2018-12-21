import SPELLS from 'common/SPELLS/index';
import CoreChanneling from 'parser/shared/modules/Channeling';

const debug = false;

class Channeling extends CoreChanneling {

  on_byPlayer_cast(event) {
    if (event.ability.guid !== (SPELLS.BARRAGE_TALENT.id || SPELLS.RAPID_FIRE.id)) {
      return;
    }
    this.beginChannel(event);
  }

  cancelChannel(event, ability) {
    if (this.isChannelingSpell(SPELLS.BARRAGE_TALENT.id) || this.isChannelingSpell(SPELLS.RAPID_FIRE.id)) {
      // If a channeling spell is "canceled" it was actually just ended, so if it looks canceled then instead just mark it as ended
      debug && this.log('Marking', this._currentChannel.ability.name, 'as ended since we started casting something else');
      this.endChannel(event);
    } else {
      super.cancelChannel(event, ability);
    }
  }

  on_byPlayer_removedebuff(event) {
    if (event.ability.guid !== SPELLS.RAPID_FIRE.id) {
      return;
    }
    if (!this.isChannelingSpell(SPELLS.RAPID_FIRE.id)) {
      // This may be true if we did the event-order fix in begincast/cast and it was already ended there.
      return;
    }
    this.endChannel(event);
  }
}

export default Channeling;
