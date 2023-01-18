<div id="appCapsule">
	<div class="section mt-2">
		<div class="card">
			<div class="card-body">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>[[LABEL_RANK]]</th>
						<th>[[LABEL_LEFT]]</th>
						<th>[[LABEL_RIGHT]]</th>
					</tr>
					</thead>
					<tbody>
					<?php foreach ($ranks as $row) {
						$rank = $row['id'];
						?>
						<tr>
							<td><?php echo $row['name'] ?></td>
							<td><?php echo isset($rank_tally['L'][$rank]) ? $rank_tally['L'][$rank] : 0; ?></td>
							<td><?php echo isset($rank_tally['R'][$rank]) ? $rank_tally['R'][$rank] : 0; ?></td>
						</tr>
					<?php } ?>
					</tbody>
				</table>
			</div>
			<div>
			</div>
		</div>
