import React from 'react';

export const Loading = () => (
  <div className="m-5">
    <button type="button" class="btn btn-sm btn-dark btn-block" disabled>
    <div class="spinner-border" role="status">
      .
      <div class="spinner-border" role="status">
        .
        <div class="spinner-border" role="status">
          .
          <div class="spinner-border" role="status">
          </div>
        </div>
      </div>
    </div>
    Loading...
    </button>
  </div>
)
