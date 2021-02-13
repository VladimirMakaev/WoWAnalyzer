import SPELLS from 'common/SPELLS';
import React from 'react';
import Statistic from 'parser/ui/Statistic';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import BoringValue from 'parser/ui/BoringValueText';
import { SpellIcon } from 'interface';
import Events, { ApplyBuffEvent, BuffEvent, RefreshBuffEvent, RemoveBuffEvent } from 'parser/core/Events';
import { formatNumber } from 'common/format';

const TRANSFER_RATE = 1;

class SpiritShellTracker {

}

class AtonementTracker {

    onDamage() {

    }
}


export class SpiritShell extends Analyzer {
    totalAbsorb = 0;

    constructor(options: Options) {
        super(options);
        this.active = this.selectedCombatant.hasTalent(SPELLS.SPIRIT_SHELL_TALENT.id);
        this.addEventListener(Events.applybuff.by(SELECTED_PLAYER).to(SELECTED_PLAYER), this.onBuffApplication.bind(this));
        this.addEventListener(Events.refreshbuff.by(SELECTED_PLAYER).to(SELECTED_PLAYER), this.onBuffRefresh.bind(this));
        this.addEventListener(Events.removebuff.by(SELECTED_PLAYER).to(SELECTED_PLAYER), this.onBuffRemoved.bind(this));
    }

    private onShellChargingStarted(event: ApplyBuffEvent) {
        console.log("Started Charging: SS");
    }

    private onShellChargingEnded(event: RemoveBuffEvent) {
        console.log("Ended Charging: SS")
    }

    private onBuffApplication(event: ApplyBuffEvent) {
    }

    private onBuffRefresh(event: RefreshBuffEvent) {
        if (event.ability.name == "Spirit Shell") {
            console.log(event.ability.name, event);
        }
    }

    private onBuffRemoved(event: RemoveBuffEvent) {
        if (event.ability.name == "Spirit Shell") {
            console.log(event.ability.name, event);
        }
    }

    statistic() {
        return <Statistic
            position={10}
            size="large"
            tooltip={(
                <>
                    Spirit Shell Fill
                </>
            )}
        >
            <BoringValue label={<><SpellIcon id={SPELLS.SPIRIT_SHELL_TALENT.id} /> Spirit Shell</>}>
                <>
                    {formatNumber(this.totalAbsorb)}
                </>
            </BoringValue>
        </Statistic>
    }
}

export default SpiritShell;
