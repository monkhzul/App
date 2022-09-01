import React from 'react'

export default function ConfirmPhone() {
  return (
    <div>
        <h4>Нэг удаагын кодоор нэвтрэх</h4>
        <form action="#" className='otc' name='one-time-code'>
            <fieldset>
                <legend for='otc-1'>Number 1</legend>
                <legend for='otc-2'>Number 2</legend>
                <legend for='otc-3'>Number 3</legend>
                <legend for='otc-4'>Number 4</legend>
                <legend for='otc-5'>Number 5</legend>
                <legend for='otc-6'>Number 6</legend>
            </fieldset> 

            <div>
            <input type="number" name="" id="otc-1" pattern='[0-9]*' value="" inputtype="numeric" autocomplete="one-time-code" required/>
            <input type="number" name="" id="otc-2" pattern='[0-9]*' value="0" min={0} max={9} maxLength={1} inputtype="numeric" autocomplete="one-time-code" required/>
            <input type="number" name="" id="otc-3" pattern='[0-9]*' value="0" min={0} max={9} maxLength={1} inputtype="numeric" autocomplete="one-time-code" required/>
            <input type="number" name="" id="otc-4" pattern='[0-9]*' value="0" min={0} max={9} maxLength={1} inputtype="numeric" autocomplete="one-time-code" required/>
            <input type="number" name="" id="otc-5" pattern='[0-9]*' value="0" min={0} max={9} maxLength={1} inputtype="numeric" autocomplete="one-time-code" required/>
            <input type="number" name="" id="otc-6" pattern='[0-9]*' value="0" min={0} max={9} maxLength={1} inputtype="numeric" autocomplete="one-time-code" required/>
        </div>
        </form>
    </div>
  )
}
