class ApplicationController < ActionController::API

  if Rails.env.production?
    rescue_from ActiveRecord::RecordNotFound, with: :handle_error
  end 
  
  private

  def handle_error(e)
    render json: { error: e.to_s }, status: :bad_request
  end
end
